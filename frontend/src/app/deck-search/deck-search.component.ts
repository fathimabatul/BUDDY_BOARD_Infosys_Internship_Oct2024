import { Component, OnInit } from '@angular/core';
import { DeckSearchService } from '../services/deckSearch.service';
import { DeckSearchResponse, Deck } from '../services/deckSearch.service';
import { CommonModule } from '@angular/common';
import { RouterLink,Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { title } from 'node:process';

@Component({
  selector: 'app-deck-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './deck-search.component.html',
  styleUrls: ['./deck-search.component.css'],
})
export class DeckSearchComponent implements OnInit {
  userRole: 'admin' | 'user' = 'user';
  
  exactMatch: boolean = false;
  likesThreshold: number = 0;
  cardsThreshold: number = 0;
  postedAfter: string | null = null;
  searchKeyword: string = '';
  filteredDecks: Deck[] = [];

  setUserRole(role: 'admin' | 'user'): void {
    if (role === 'admin' || role === 'user') {
      this.userRole = role;
    } else {
      this.userRole = role;
    }
  }

  editDeck(deckId: string): void {
    this.router.navigate(['/deck', deckId]);
  }

 // this.filteredDecks.unshift(deck);
  constructor(private deckSearchService: DeckSearchService, private router: Router) {}

  ngOnInit(): void {
    // Fetch all decks on initial load
    this.fetchAllDecks();
  }

  fetchAllDecks(): void {
    // Call the service to get all the decks without filters
    this.deckSearchService.searchDecks(false, '', 0, 0, null).subscribe(
      (response: DeckSearchResponse) => {
        console.log('All decks fetched:', response);
        this.filteredDecks = response.data; // Set all decks as the initial filtered decks
      },
      (error) => {
        console.error('Error fetching all decks:', error);
      }
    );
  }

  resetFilters(): void {
    this.exactMatch = false;
    this.likesThreshold = 0;
    this.cardsThreshold = 0;
    this.postedAfter = null;
    this.searchKeyword = '';
    this.filteredDecks = []; // Clear the previous results
    // Fetch all decks after resetting filters
    this.fetchAllDecks();
  }

  searchDecks(): void {
    console.log('Searching decks with filters:', {
      exactMatch: this.exactMatch,
      searchKeyword: this.searchKeyword,
      likesThreshold: this.likesThreshold,
      cardsThreshold: this.cardsThreshold,
      postedAfter: this.postedAfter,
    });

    // Call the service method with the current filter values
    this.deckSearchService
      .searchDecks(
        this.exactMatch,
        this.searchKeyword,
        this.cardsThreshold,
        this.likesThreshold,
        this.postedAfter
      )
      .subscribe(
        (response: DeckSearchResponse) => {
          console.log('Deck search results:', response);
          this.filteredDecks = response.data;
          console.log(this.filteredDecks);
        },
        (error) => {
          console.error('Error fetching decks:', error);
        }
      );
  }
}
