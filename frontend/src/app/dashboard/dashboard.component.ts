import { Component, OnInit } from '@angular/core';
import { Deck, DecksResponse } from '../models/deck.interface'; // Adjust the path as needed
import { DeckService } from '../services/deck.service'; // Adjust the path as needed
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  favoriteDecks: Deck[] = [];
  publicDecks: Deck[] = [];
  isLoadingFavorites = true;
  isLoadingPublic = true;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {

    this.loadFavoriteDecks();
    this.loadPublicDecks();
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
