import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Simulate API call
      const { email, password } = this.loginForm.value;
      
      // Replace this with actual API call
      const isAuthenticated = email === '' && password ==='';

      if (isAuthenticated) {
        this.errorMessage = null;
        alert('Login successful!');
        this.router.navigate(['/dashboard']); // Adjust route as needed
      } else {
        this.errorMessage = 'Incorrect username or password.';
      }
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  navigateToForgetPassword() {
    this.router.navigate(['/forget-password']);
  }
}
