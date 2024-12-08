import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardService } from '../services/card.service';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.interface';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.css']
})
export class CardsPageComponent implements OnInit {
  cards: Card[] = []; // Array to hold fetched cards
  loading = true; // Loading indicator
  errorMessage = ''; // Error message for failed requests

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCards();
  }

  /**
   * Fetch cards from the backend and handle response.
   */
  fetchCards(): void {
    this.cardService.getAllCards().subscribe({
      next: (response) => {
        this.cards = response.data; // Assign fetched cards to the local variable
        this.loading = false;
        console.log(this.cards);  
      },
      error: (error) => {
        console.error('Error fetching cards:', error);
        this.errorMessage = 'Failed to load cards. Please try again later.';
        this.loading = false;
      }
    });
  }

  /**
   * Navigate to the card details page.
   * @param cardId - The ID of the card to navigate to.
   */
  navigateToCardDetails(cardId: string): void {
    this.router.navigate([`/card/${cardId}`]);
  }
}
