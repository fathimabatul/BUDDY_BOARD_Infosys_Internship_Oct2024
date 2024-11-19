// reset-password.component.ts
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    // console.log(this.token); // Retrieve token from route
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.token) {
      const newPassword = this.resetPasswordForm.value.password;
      const token = this.token;
      console.log(token);

      this.authService.resetPassword(this.token, newPassword).subscribe({
        next: (response) => {
          this.message = 'Password successfully reset!';
          this.router.navigate(['/signin']); // Redirect to sign-in page
        },
        error: (err) => {
          this.message = 'Failed to reset password. Please try again.';
          console.error(err);
        },
      });
    }
  }
}
