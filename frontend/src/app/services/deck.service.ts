import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck, DecksResponse, SingleDecksResponse } from '../models/deck.interface'; // Ensure this path is correct


@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private apiUrl = 'https://buddy-board-infosys-internship-oct2024.onrender.com/api/deck';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the auth token from localStorage.
   */
  // private getAuthToken(): string | null {
  //   if (typeof window !== 'undefined' && localStorage) {
  //     return localStorage.getItem('token');
  //   }
  //   return null; // Fallback for non-browser environments
  // }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      console.log('localStorage:', localStorage);
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
   * Create a new deck.
   * @param title The title of the new deck.
   */
  createDeck(title: string): Observable<any> {
    const headers = this.createAuthHeaders();
    const body = { title };
    return this.http.post<any>(`${this.apiUrl}/`, body, { headers });
  }

  /**
   * Get deck by ID.
   * @param id The ID of the deck to retrieve.
   */
  getDeckById(id: string): Observable<SingleDecksResponse> {
    const headers = this.createAuthHeaders();
    return this.http.get<SingleDecksResponse>(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Update deck by ID.
   * @param id The ID of the deck to update.
   * @param title The updated title for the deck.
   * @param cards The array of card IDs to add to the deck.
   */
  updateDeck(id: string, title: string, cards: string[]): Observable<SingleDecksResponse> {
    const headers = this.createAuthHeaders();
    const body = { title, cards };
    return this.http.put<SingleDecksResponse>(`${this.apiUrl}/${id}`, body, { headers });
  }

  /**
   * Delete a deck by ID.
   * @param id The ID of the deck to delete.
   */
  deleteDeck(id: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Favorite or unfavorite a deck by ID.
   * @param id The ID of the deck to favorite/unfavorite.
   */
  toggleFavoriteDeck(id: string): Observable<SingleDecksResponse> {
    const headers = this.createAuthHeaders();
    return this.http.post<SingleDecksResponse>(`${this.apiUrl}/${id}/favorite`, {}, { headers });
  }

  /**
   * Get all public decks.
   * Returns a DecksResponse containing public decks.
   */
  getPublicDecks(): Observable<DecksResponse> {
    const headers = this.createAuthHeaders();
    return this.http.get<DecksResponse>(`${this.apiUrl}/public`, { headers });
  }

  /**
   * Get user favorite decks.
   * Returns a DecksResponse containing favorite decks.
   */
  getFavoriteDecks(): Observable<DecksResponse> {
    const headers = this.createAuthHeaders();
    return this.http.get<DecksResponse>(`${this.apiUrl}/favorites`, { headers });
  }
}
