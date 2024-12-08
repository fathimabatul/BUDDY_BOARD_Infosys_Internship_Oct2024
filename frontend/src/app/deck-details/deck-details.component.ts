import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeckService } from '../services/deck.service'; // Adjust the path as per your project structure
import { Deck, SingleDecksResponse } from '../models/deck.interface'; // Adjust the path for interfaces
import { Card } from '../models/card.interface';
import { CommonModule, NgIf } from '@angular/common';
import { userService } from '../services/user.service'; // Import the UserService

@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf],
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css']
})
export class DeckDetailsComponent implements OnInit {
  @Input() createdOn: string = ''; 
  @Input() createdBy: string = ''; 
  currentIndex = 0;
  deckTitle: string = '';
  likesCount: number = 0;
  deckId: string = '';
  cards: Card[] = [];
  message: string | null = null;
  isFavorite: boolean = false; // Track the favorite status of the deck
  user: any = null; // Define the 'user' property to hold the user data

  constructor(
    private route: ActivatedRoute, 
    private deckService: DeckService,
    private userService: userService // Inject the UserService here
  ) {}

  ngOnInit() {
    // Get the deck ID from the URL
    this.deckId = this.route.snapshot.paramMap.get('id') || '';
    
    if (this.deckId) {
      this.user = this.userService.getUserFromLocalStorage(); // Fetch user data from localStorage
      if (this.user) {
        console.log(this.user); // Log the user data for debugging or displaying
      } else {
        console.error('No user data found in localStorage');
      }
      this.fetchDeckDetails(this.deckId);
    }
  }

  /**
   * Fetch deck details from the service and populate component variables.
   * @param id - The ID of the deck.
   */
  fetchDeckDetails(id: string) {
    this.deckService.getDeckById(id).subscribe(
      (response) => {
        const deck: Deck = response.data;
        this.deckTitle = deck.title;
        this.cards = deck.cards || []; // Ensure it's an array
        this.createdOn = new Date(deck.createdAt).toLocaleDateString();
        this.createdBy = deck.created_by;

        // Set the likes count and favorite status directly from the response
        this.likesCount = deck.favorites ? deck.favorites.length : 0;
        this.isFavorite = deck.favorites ? deck.favorites.includes(this.user._id) : false;
        console.log(response);
        
      },
      (error) => {
        console.error('Failed to fetch deck details:', error);
        this.cards = []; // Handle empty cards on error
      }
    );
  }

  /**
   * Handle navigation to a specific card.
   * @param index - Index of the card in the array.
   */
  changeCard(index: number) {
    if (this.cards && index >= 0 && index < this.cards.length) {
      this.currentIndex = index;
    }
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  
  goToNext() {
    if (this.cards && this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    }
  }

  /**
   * Handle the like button click.
   */
  likeDeck() {
    this.deckService.toggleFavoriteDeck(this.deckId).subscribe(
      (response) => {
        if (response.success) {
          this.isFavorite = true;  // Set the deck as a favorite
          this.likesCount++;  // Increment likes count
          this.showMessage('This deck was added to favorites!');
        }
      },
      (error) => {
        console.error('Failed to add to favorites:', error);
        this.showMessage('Failed to add to favorites.');
      }
    );
  }

  /**
   * Handle the dislike button click.
   */
  dislikeDeck() {
    this.deckService.toggleFavoriteDeck(this.deckId).subscribe(
      (response) => {
        if (response.success) {
          this.isFavorite = false; // Remove the deck from favorites
          this.likesCount--;  // Decrement likes count
          this.showMessage('You have removed the deck from favorites.');
        }
      },
      (error) => {
        console.error('Failed to remove from favorites:', error);
        this.showMessage('Failed to remove from favorites.');
      }
    );
  }

  /**
   * Display a temporary popup message.
   * @param msg - The message to show.
   */
  private showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
