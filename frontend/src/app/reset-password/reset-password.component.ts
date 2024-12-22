import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
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

  // Custom Validator: Ensures password and confirmPassword match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.token) {
      const { password } = this.resetPasswordForm.value;
      this.authService.resetPassword(this.token, password).subscribe({
        next: () => {
          this.message = 'Password successfully reset!';
          setTimeout(() => this.router.navigate(['/signin']), 2000); // Redirect after 2 seconds
        },
        error: (err) => {
          this.message = 'Failed to reset password. Please try again.';
          console.error(err);
        },
      });
    } else if (!this.token) {
      this.message = 'Invalid or missing reset token.';
    }
  }
}
