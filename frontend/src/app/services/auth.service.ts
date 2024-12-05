// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
  SigninResponse,
  PasswordResetRequest,
  PasswordResetResponse,
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://buddy-board-infosys-internship-oct2024.onrender.com/api';

  signup(userData: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(
      `${this.apiUrl}/auth/users/signup`,
      userData
    );
  }

  signin(credentials: SigninRequest): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(
      `${this.apiUrl}/auth/users/signin`,
      credentials
    );
  }
  sendPasswordResetEmail(
    data: PasswordResetRequest
  ): Observable<PasswordResetResponse> {
    return this.http.post<PasswordResetResponse>(
      `${this.apiUrl}/auth/users/sendPasswordResetEmail`,
      data
    );
  }

  resetPassword(
    token: string,
    password: string
  ): Observable<PasswordResetResponse> {
    return this.http.post<PasswordResetResponse>(
      `${this.apiUrl}/auth/users/resetPassword`,
      { token, password }
    );
  }
}
