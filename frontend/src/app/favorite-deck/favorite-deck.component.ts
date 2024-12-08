import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeckService } from '../services/deck.service';
import { Deck, DecksResponse } from '../models/deck.interface';

@Component({
  selector: 'app-favorite-deck',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './favorite-deck.component.html',
  styleUrl: './favorite-deck.component.css'
})
export class FavoriteDeckComponent {
  favoriteDecks: Deck[] = [];
  isLoadingFavorites = true;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.loadFavoriteDecks();
  }

  private loadFavoriteDecks(): void {
    this.deckService.getFavoriteDecks().subscribe(
      (response: DecksResponse) => {
        this.favoriteDecks = response.data || [];
        this.isLoadingFavorites = false;
        console.log(this.favoriteDecks);
        
      },
      (error) => {
        console.error('Failed to load favorite decks:', error);
        this.isLoadingFavorites = false;
      }
    );
  }
}
