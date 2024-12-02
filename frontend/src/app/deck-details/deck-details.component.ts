import { Component } from '@angular/core';

@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.css'
})
export class DeckDetailsComponent {
  currentIndex = 2;
  deckTitle = "Operating Systems";
  cards = [
    { title: "Processes", description: "Description about Processes" },
    { title: "Kernel", description: "Description about Kernel" },
    { title: "Multitasking", description: "The ability of the OS to run multiple programs apparently at the same time." },
    { title: "Input / Output", description: "Description about Input/Output" },
    { title: "User Interface", description: "Description about User Interface" },
  ];

  changeCard(index: number) {
    this.currentIndex = index;
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToNext() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    }
  }
}
