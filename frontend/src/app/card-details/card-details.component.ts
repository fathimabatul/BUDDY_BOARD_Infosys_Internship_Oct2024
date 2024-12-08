import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardService } from '../services/card.service';
import { DeckService } from '../services/deck.service'; // Import DeckService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Deck } from '../models/deck.interface'; // Import Deck interface
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent implements OnInit {
  note = {
    id: '',
    title: '',
    content: '',
    createdOn: '',
    lastEdited: '',
  };

  decks: Deck[] = []; // List of available decks
  selectedDeckId: string = ''; // ID of the selected deck
  showDeckDropdown: boolean = false; // Controls the visibility of the dropdown


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cardService: CardService,
    private deckService: DeckService,
    private router: Router // Add Router service
  ) {}
  

  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('id'); // Extract card ID from the route
    if (cardId) {
      this.note.id = cardId; // Set the card ID
      this.getCardDetails(cardId); // Fetch card details
    }
  }
  

  // Fetch card details by ID
  getCardDetails(id: string): void {
    this.cardService.getCard(id).subscribe(
      (response) => {
        const cardData = response.data;
        this.note = {
          id: cardData._id,
          title: cardData.title,
          content: cardData.content,
          createdOn: new Date(cardData.created_at).toLocaleDateString(),
          lastEdited: cardData.updated_at
            ? new Date(cardData.updated_at).toLocaleDateString()
            : '--',
        };
      },
      (error) => {
        console.error('Error fetching card details:', error);
      }
    );
  }

  // Fetch all decks
  fetchDecks(): void {
    this.deckService.getPublicDecks().subscribe(
      (response) => {
        this.decks = response.data;
      },
      (error) => {
        console.error('Error fetching decks:', error);
      }
    );
  }

  // Save note
  saveNote(): void {
    if (!this.note.id) {
      console.error('Card ID is missing. Cannot save.');
      return;
    }

    const updatedNote = {
      title: this.note.title,
      content: this.note.content,
      lastEdited: new Date().toISOString(),
    };

    this.cardService.updateCard(this.note.id, updatedNote.title, updatedNote.content).subscribe(
      () => {
        this.note.lastEdited = new Date().toLocaleDateString();
        alert('Note saved successfully!');
      },
      (error) => {
        console.error('Error saving note:', error);
      }
    );
  }

  // Toggle the visibility of the deck dropdown
  toggleDeckDropdown(): void {
    if (!this.showDeckDropdown) {
      this.fetchDecks(); // Fetch decks if not already open
    }
    this.showDeckDropdown = !this.showDeckDropdown;
  }

  // Add the current card to the selected deck
  addToSelectedDeck(): void {
    const cardId = this.note.id; // Extracted from the route in `ngOnInit`
  
    if (!this.selectedDeckId) {
      alert('Please select a deck first.');
      return;
    }
  
    this.deckService.getDeckById(this.selectedDeckId).subscribe(
      (deckResponse) => {
        // Extract the existing card IDs from the deck
        const existingCardIds = deckResponse.data.cards.map((card: any) =>
          typeof card === 'string' ? card : card._id
        );
  
        // Add the current card's ID from the URL
        const updatedCards = [...existingCardIds, cardId];
  
        // Update the deck with the new card IDs
        this.deckService.updateDeck(this.selectedDeckId, deckResponse.data.title, updatedCards).subscribe(
          () => {
            alert('Card added to the deck successfully!');
            this.showDeckDropdown = false; // Hide dropdown
  
            // Navigate to the deck's page using Angular Router
            this.router.navigate([`/deck/${this.selectedDeckId}`]);
          },
          (error) => {
            console.error('Error adding card to the deck:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching deck details:', error);
      }
    );
  }
  
  
  

  // Edit the title of the note
  editTitle(): void {
    const newTitle = prompt('Enter new title:', this.note.title);
    if (newTitle && newTitle.trim()) {
      this.note.title = newTitle.trim();
    }
  }
}
