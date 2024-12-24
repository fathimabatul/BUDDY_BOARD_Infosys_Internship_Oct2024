import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string | null = null;
  token: string | null = null;
  showPassword = false; // For toggling password visibility
  showConfirmPassword = false; // For toggling confirm password visibility
  loading = false; // For showing loading spinner

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      this.message = 'Invalid or missing reset token.';
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (!this.token) {
      this.message = 'Invalid or missing reset token.';
      return;
    }

    if (this.resetPasswordForm.invalid) {
      this.message = 'Please correct the errors in the form.';
      return;
    }

    this.loading = true; // Start loading
    const { password } = this.resetPasswordForm.value;
    this.authService.resetPassword(this.token, password).subscribe({
      next: () => {
        this.message = 'Password successfully reset!';
        setTimeout(() => {
          this.loading = false; // Stop loading before navigating
          this.router.navigate(['/signin']);
        }, 2000);
      },
      error: (err) => {
        this.loading = false; // Stop loading on error
        if (err.status === 400) {
          this.message = err.error?.message || 'Invalid or expired token.';
        } else {
          this.message = 'Failed to reset password. Please try again.';
        }
        console.error(err);
      },
    });
  }
}