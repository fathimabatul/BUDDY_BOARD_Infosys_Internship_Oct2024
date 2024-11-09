// src/app/app.component.ts
import { Component } from '@angular/core';

import { SignupComponent } from './signup/signup.component'; // Import SignupComponent

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      
      <app-signup></app-signup> <!-- Display SignupComponent -->
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ SignupComponent ], // Import both components here
})
export class AppComponent {
  title = 'my-angular-app';
}
