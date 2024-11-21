import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PasswordResetRequest } from '../interfaces/auth.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const emailData: PasswordResetRequest = {
        email: this.forgotPasswordForm.value.email,
      };

      this.authService.sendPasswordResetEmail(emailData).subscribe({
        next: (response) => {
          this.message = response.message;
        },
        error: (err) => {
          this.message = 'Failed to send reset email. Please try again.';
          console.error(err);
        },
      });
    }
  }
}
