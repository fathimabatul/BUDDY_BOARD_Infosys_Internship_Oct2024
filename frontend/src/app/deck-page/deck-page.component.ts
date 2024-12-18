import { Component } from '@angular/core';
import { CreateDeckComponent } from '../create-deck/create-deck.component';
import { RouterLink } from '@angular/router';
import { Deck, DecksResponse } from '../models/deck.interface';
import { DeckService } from '../services/deck.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deck-page',
  standalone: true,
  imports: [CreateDeckComponent,RouterLink, CommonModule],
  templateUrl: './deck-page.component.html',
  styleUrl: './deck-page.component.css'
})
export class DeckPageComponent {
  favoriteDecks: Deck[] = [];
  publicDecks: Deck[] = [];
  isLoadingFavorites = true;
  isLoadingPublic = true;

  constructor(private deckService: DeckService) {}

  userRole: 'admin' | 'user' = 'user';
  // Toggle states
  showAllPublic: boolean = false;
  showAllFav: boolean = false;
  isModalVisible: boolean = false; 
  isSuccess:boolean| null = null;
  savedDeck: { title: string }[] = []; 

  ngOnInit(): void {
    this.setUserRoleBasedOnLocalStorage(); // Fetch and set user role
    this.loadFavoriteDecks();
    this.loadPublicDecks();
  }

  setUserRoleBasedOnLocalStorage(): void {
    const user = localStorage.getItem('user'); // Retrieve the user data from localStorage
    if (user) {
      try {
        const userData = JSON.parse(user); // Parse the JSON string
        this.userRole = userData.role === 'admin' ? 'admin' : 'user'; // Set role based on stored data
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        this.userRole = 'user'; // Default to 'user' if parsing fails
      }
    } else {
      console.warn(
        'No user data found in localStorage. Defaulting to "user" role.'
      );
      this.userRole = 'user'; // Default to 'user' if no data is found
    }
  }


   // Methods to get displayed decks
  getDisplayedPublicDecks() {
    return this.showAllPublic ? this.publicDecks : this.publicDecks.slice(0, 4);
  }

  getDisplayedFavDecks() {
    return this.showAllFav ? this.favoriteDecks : this.favoriteDecks.slice(0, 4);
  }

  // Toggle methods
  togglePublicDecks() {
    if (this.publicDecks.length > 4) {
      this.showAllPublic = !this.showAllPublic;
    }
  }

  toggleFavDecks() {
    if (this.favoriteDecks.length > 4) {
      this.showAllFav = !this.showAllFav;
    }
  }
  toggleOverlay(): void {
    this. isModalVisible= !this.isModalVisible;
  }

  getDeckFormData(data: { title: string }): void {
    this.deckService.createDeck(data.title).subscribe(
      (response) => {
        console.log('Deck created successfully:', response);
        this.isSuccess = true;
        this.loadPublicDecks();
  
        // Close the modal
        this.isModalVisible = false;
      },
      (error) => {
        console.error('Failed to create deck:', error);
        this.isSuccess = false;
      }
    );
  }
  
  

  private loadFavoriteDecks(): void {
    this.deckService.getFavoriteDecks().subscribe(
      (response: DecksResponse) => {
        this.favoriteDecks = response.data || [];
        this.isLoadingFavorites = false;
      },
      (error) => {
        console.error('Failed to load favorite decks:', error);
        this.isLoadingFavorites = false;
      }
    );
  }

  private loadPublicDecks(): void {
    this.deckService.getPublicDecks().subscribe(
      (response: DecksResponse) => {
        this.publicDecks = response.data || [];
        this.isLoadingPublic = false;
      },
      (error) => {
        console.error('Failed to load public decks:', error);
        this.isLoadingPublic = false;
      }
    );
  }
}
