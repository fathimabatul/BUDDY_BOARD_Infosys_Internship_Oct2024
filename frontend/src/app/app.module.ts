import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Correct import
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Correctly placed in imports
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
