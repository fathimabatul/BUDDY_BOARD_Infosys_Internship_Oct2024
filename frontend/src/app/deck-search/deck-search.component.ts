import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-deck-search',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './deck-search.component.html',
  styleUrls: ['./deck-search.component.css']
})
export class DeckSearchComponent implements OnInit {
  searchKeyword: string = '';
  exactMatch: boolean = false;
  likesThreshold: number = 10000;
  cardsThreshold: number = 20;
  postedAfter: string | null = null;

  decks: any[] = []; // Full list of decks from the backend
  filteredDecks: any[] = []; // Filtered decks to display

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDecks();
  }

  // Fetch decks from backend API
  fetchDecks(): void {
    this.http.get<any[]>('/api/decks').subscribe(
      (data) => {
        this.decks = data;
        this.filteredDecks = data; // Initially, all decks are shown
      },
      (error) => {
        console.error('Error fetching decks:', error);
      }
    );
  }

  // Filter decks based on search criteria
  searchDecks(): void {
    this.filteredDecks = this.decks.filter((deck) => {
      const matchesKeyword = this.exactMatch
        ? deck.name.toLowerCase() === this.searchKeyword.toLowerCase()
        : deck.name.toLowerCase().includes(this.searchKeyword.toLowerCase());

      const matchesLikes = deck.likes >= this.likesThreshold;
      const matchesCards = deck.cards >= this.cardsThreshold;
      const matchesDate =
        !this.postedAfter || new Date(deck.postedOn) >= new Date(this.postedAfter);

      return matchesKeyword && matchesLikes && matchesCards && matchesDate;
    });
  }

  // Reset filters and fetch all decks again
  resetFilters(): void {
    this.searchKeyword = '';
    this.exactMatch = false;
    this.likesThreshold = 10000;
    this.cardsThreshold = 20;
    this.postedAfter = null;
    this.filteredDecks = [...this.decks];
  }

  // Open a specific deck
  openDeck(deck: any): void {
    console.log('Opening deck:', deck.name);
    // Navigate to the deck detail page or perform other actions
  }
}

