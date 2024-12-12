import { Component } from '@angular/core';
import { CreateDeckComponent } from '../create-deck/create-deck.component';
import { RouterLink } from '@angular/router';
import { Deck, DecksResponse } from '../models/deck.interface';
import { DeckService } from '../services/deck.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deck-page',
  standalone: true,
  imports: [CreateDeckComponent, RouterLink, CommonModule],
  templateUrl: './deck-page.component.html',
  styleUrl: './deck-page.component.css',
})
export class DeckPageComponent {
  favoriteDecks: Deck[] = [];
  publicDecks: Deck[] = [];
  isLoadingFavorites = true;
  isLoadingPublic = true;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.loadFavoriteDecks();
    this.loadPublicDecks();
  }

  // Toggle states
  showAllPublic: boolean = false;
  showAllFav: boolean = false;
  isModalVisible: boolean = false;
  isSuccess: boolean | null = null;
  savedDeck: { title: string }[] = [];

  // Methods to get displayed decks
  getDisplayedPublicDecks() {
    return this.showAllPublic ? this.publicDecks : this.publicDecks.slice(0, 4);
  }

  getDisplayedFavDecks() {
    return this.showAllFav
      ? this.favoriteDecks
      : this.favoriteDecks.slice(0, 4);
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
    this.isModalVisible = !this.isModalVisible;
  }

  // getDeckFormData(data: { title: string}): void {
  //   setTimeout(() => {
  //     this.isSuccess=true;
  //     if(this.isSuccess){
  //       // Append new deck to the savedDeck array
  //       const newDeck = {
  //         title: data.title
  //     };
  //     // Add the new deck at the top of the publicDeck array
  //     this.publicDecks.unshift(newDeck);
  //     }
  //     else{
  //       this.isSuccess=false;
  //     }
  //   }, 2000);
  // }

  getDeckFormData(data: { title: string }): void {
    this.deckService.createDeck(data.title).subscribe(
      (response) => {
        console.log('Deck created successfully:', response);
        this.isSuccess = true;

        // // Construct the new deck object based on the API response
        // const newDeck: Deck = {
        //   _id: response._id,                // Assuming response includes this
        //   title: response.title,            // The title from the response
        //   cards: response.cards || [],      // Default to empty array if not provided
        //   created_by: response.created_by,  // The creator's ID
        //   visibility: response.visibility || 'public', // Default to 'public' if not provided
        //   is_blocked: response.is_blocked || false,    // Default to false if not provided
        //   favorites: response.favorites || [],         // Default to empty array if not provided
        //   createdAt: response.createdAt || new Date().toISOString(), // Use current time as fallback
        //   updatedAt: response.updatedAt || new Date().toISOString(), // Use current time as fallback
        //   __v: response.__v || 0           // Default to 0 if not provided
        // };

        // // Add the new deck to the top of the publicDecks array
        // this.publicDecks = [...this.publicDecks, newDeck];

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
    this.deckService.getUserDecks().subscribe(
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
