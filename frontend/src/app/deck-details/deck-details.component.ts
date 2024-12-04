import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-deck-details',
  standalone: true,
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css'],
  imports: [CommonModule] // Include CommonModule here
})
export class DeckDetailsComponent {
  currentIndex = 2;
  deckTitle = "Operating Systems";
  cards = [
    { title: "Processes", description: "Description about Processes" },
    { title: "Kernel", description: "Description about Kernel" },
    { title: "Multitasking", description: "The ability of the OS to run multiple programs apparently at the same time." },
    { title: "Input / Output", description: "Description about Input/Output" },
    { title: "User Interface", description: "Description about User Interface" }
  ];

  message: string | null = null;

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

  likeDeck() {
    this.showMessage("This deck was added to favorites!");
  }

  dislikeDeck() {
    this.showMessage("You have removed the deck from favorites.");
  }

  private showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => {
      this.message = null;
    }, 3000); // Hide the message after 3 seconds
  }
}
