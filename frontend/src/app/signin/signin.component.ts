import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signinForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isLoading = false;
  errorMessage = '';
  showPassword = false;

  onSubmit(): void {
    if (this.signinForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.signin(this.signinForm.value).subscribe({
        next: (response) => {
          console.log(response);

          // Store the token in localStorage
          if (response.message?.accessToken) {
            localStorage.setItem('token', response.message.accessToken);
          }

          // Extract and store the user in localStorage
          // if (response.message?.user) {
          //   localStorage.setItem('user', JSON.stringify(response.message.user));
          // }

          // // Navigate to dashboard or home page
          // this.router.navigate(['/dashboard']);
          // Extract and store the user in localStorage
          if (response.message?.user) {
            const user = response.message.user;
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect based on user role
            if (user.role === 'admin') {
              this.router.navigate(['/deckPage']); // Admin landing page
            } else {
              this.router.navigate(['/dashboard']); // User landing page
            }
          }
        },
        error: (error) => {
          console.log(error);
          this.errorMessage =
            error.error?.message || 'Invalid email or password';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.markFormGroupTouched(this.signinForm);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
