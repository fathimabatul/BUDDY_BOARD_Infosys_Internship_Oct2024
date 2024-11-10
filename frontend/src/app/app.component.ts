// src/app/app.component.ts
import { Component } from '@angular/core';

import { SignupComponent } from './signup/signup.component'; // Import SignupComponent
import { ResetPasswordComponent } from './reset-password/reset-password.component'; //Import RestPasswordComponent

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      
      <app-signup></app-signup> <!-- Display SignupComponent -->
    </div>
    <div class="container">
      
      <app-reset-password></app-reset-password> <!-- Display ResetPasswordComponent -->
    </div>
  `,
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ SignupComponent,ResetPasswordComponent ], // Import both components here
})
export class AppComponent {
  title = 'my-angular-app';
}
