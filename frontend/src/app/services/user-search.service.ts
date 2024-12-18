import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserSearchResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  decksCount: number;
  likesCount: number;
  decks: {
    _id: string;
    title: string;
    cards: string[];
    created_by: string;
    visibility: string;
    is_blocked: boolean;
    favorites: string[];
    createdAt: string;
    updatedAt: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private apiUrl = 'https://buddy-board-infosys-internship-oct2024.onrender.com/api/auth/users/searchUser';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the auth token from localStorage.
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Helper method to construct authorization headers.
   */
  private createAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    console.log(token);
    
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  /**
   * Search users based on the provided filters.
   * @param name The name of the user to search for.
   * @param exactMatch Whether to perform an exact match on the name.
   * @param likesCount The minimum number of likes the user has received.
   * @param decksCount The minimum number of decks the user has created.
   * @param joinedAfter The date after which the user joined.
   * @param role The role of the user (e.g., 'user', 'admin').
   */
  searchUsers(
    name: string,
    exactMatch: boolean,
    likesCount: number,
    decksCount: number,
    joinedAfter: string | null,
    role: string
  ): Observable<UserSearchResponse[]> {
    const headers = this.createAuthHeaders();

    // Construct the URL with query parameters dynamically
    let url = `${this.apiUrl}?exactMatch=${exactMatch}&likesCount=${likesCount}&decksCount=${decksCount}`;

    if (joinedAfter) {
      url += `&joinedAfter=${joinedAfter}`;
    }
    if (name) {
      url += `&name=${name}`;
    }
    if (role) {
      url += `&role=${role}`;
    }

    // Make the HTTP GET request
    return this.http.get<UserSearchResponse[]>(url, { headers });
  }
}
