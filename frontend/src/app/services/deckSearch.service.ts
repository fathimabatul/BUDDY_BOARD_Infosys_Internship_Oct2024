import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeckSearchResponse {
  statuscode: number;
  message: string;
  data: Deck[];
  success: boolean;
}

export interface Deck {
  _id: string;
  title: string;
  created_by: string;
  createdAt: string;
  cardsCount: number;
  favoritesCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DeckSearchService {
  private apiUrl = 'https://buddy-board-infosys-internship-oct2024.onrender.com/api/deck/search';

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
   * Search decks based on the provided filters.
   * @param exactMatch Whether to perform an exact match on the title.
   * @param title The search keyword for deck titles.
   * @param cardsCount The minimum number of cards in the deck.
   * @param favoritesCount The minimum number of likes for the deck.
   * @param postedAfter The date after which the deck must have been posted.
   */
  searchDecks(
    exactMatch: boolean,
    title: string,
    cardsCount: number,
    favoritesCount: number,
    postedAfter: string | null
  ): Observable<DeckSearchResponse> {
    const headers = this.createAuthHeaders();

    // Construct the URL with query parameters dynamically
    let url = `${this.apiUrl}?exactMatch=${exactMatch}&cardsCount=${cardsCount}&favoritesCount=${favoritesCount}`;

    if (postedAfter) {
      url += `&postedAfter=${postedAfter}`;
    }
    if (title) {
      url += `&title=${title}`;
    }

    // Make the HTTP GET request
    return this.http.get<DeckSearchResponse>(url, { headers });
  }
}
