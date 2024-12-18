// user-profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileResponse } from '../models/user-profile.interface'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl =
    'https://buddy-board-infosys-internship-oct2024.onrender.com/api/auth/users';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the auth token from localStorage.
   */
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    console.warn('localStorage is not accessible in this environment.');
    return null;
  }

  /**
   * Helper method to construct authorization headers.
   */
  private createAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  /**
   * Get user profile by ID.
   * @param id The ID of the user to retrieve.
   */
  getUserProfile(id: string): Observable<UserProfileResponse> {
    const headers = this.createAuthHeaders();
    return this.http.get<UserProfileResponse>(`${this.apiUrl}/getUser/${id}`, {
      headers,
    });
  }
}
