import { Component } from '@angular/core';

@Component({
  selector: 'app-deck-search',
  standalone: true,
  imports: [],
  templateUrl: './deck-search.component.html',
  styleUrl: './deck-search.component.css'
})
export class DeckSearchComponent {
   decks = [
    { name: 'Operating Systems', username: 'Random_M', cardsCount: 5, postedDate: '6th Jan, 2024', likes: 2000 },
    { name: 'Environmental Systems Engineering', username: 'KanishShan', cardsCount: 17, postedDate: '13th Dec, 2023', likes: 13000 },
    { name: 'Conserving EcoSystems', username: 'RangFlare', cardsCount: 4, postedDate: '22nd Jun, 2022', likes: 179 },
    { name: 'Software Systems Engineering', username: 'MathuSwamy', cardsCount: 9, postedDate: '19th Feb, 2024', likes: 972 }
  ];

  filters = {
    exactMatch: false,
    minLikes: 0,
    minCards: 0,
    postedAfter: ''
  };

  get filteredDecks() {
    return this.decks.filter(deck => {
      return (
        deck.likes >= this.filters.minLikes &&
        deck.cardsCount >= this.filters.minCards &&
        (!this.filters.postedAfter || new Date(deck.postedDate) >= new Date(this.filters.postedAfter))
      );
    });
  }

  openDeck(deckName: string) {
    alert('Opening deck: ' + deckName);
    
  }

  likeDeck(deck: any) {
    deck.likes += 100; 
  }
}
  


