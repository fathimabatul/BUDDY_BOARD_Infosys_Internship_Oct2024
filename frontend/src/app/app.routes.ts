import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


export const routes: Routes = [
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
