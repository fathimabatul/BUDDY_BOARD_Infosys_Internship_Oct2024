import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Deck, DecksResponse } from '../models/deck.interface';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-public-deck',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './public-deck.component.html',
  styleUrl: './public-deck.component.css'
})
export class PublicDeckComponent {
  publicDecks: Deck[] = [];
  isLoadingPublic = true;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.loadPublicDecks();
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
