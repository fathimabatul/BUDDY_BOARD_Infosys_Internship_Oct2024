// src/app/signup/signup.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class SignupComponent {
  title = 'Sign Up';
}
