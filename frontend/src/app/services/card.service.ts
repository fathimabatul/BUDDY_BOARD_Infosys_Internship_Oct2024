import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card, GetAllCardsResponse, SingleCardResponse } from '../models/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = 'https://buddy-board-infosys-internship-oct2024.onrender.com/api/card';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the auth token from localStorage.
   */
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      console.log('Token from localStorage:', localStorage.getItem('token'));
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
   * Create a new card.
   * @param title The title of the card.
   * @param content The content of the card.
   */
  createCard(title: string, content: string): Observable<any> {
    const headers = this.createAuthHeaders();
    const body = { title, content };
    return this.http.post<any>(`${this.apiUrl}/`, body, { headers });
  }

  /**
   * Update an existing card by ID.
   * @param id The ID of the card to update.
   * @param title The updated title of the card.
   * @param content The updated content of the card.
   */
  updateCard(id: string, title: string, content: string): Observable<any> {
    const headers = this.createAuthHeaders();
    const body = { title, content };
    return this.http.put<any>(`${this.apiUrl}/${id}`, body, { headers });
  }

  /**
   * Delete a card by ID.
   * @param id The ID of the card to delete.
   */
  deleteCard(id: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Get a card by ID.
   * @param id The ID of the card to retrieve.
   */
  getCard(id: string): Observable<SingleCardResponse> {
    const headers = this.createAuthHeaders();
    return this.http.get<SingleCardResponse>(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Get all cards.
   * Retrieves all cards from the API.
   */
  getAllCards(): Observable<GetAllCardsResponse> {
    const headers = this.createAuthHeaders();
    return this.http.get<GetAllCardsResponse>(`${this.apiUrl}/`, { headers });
  }
}
