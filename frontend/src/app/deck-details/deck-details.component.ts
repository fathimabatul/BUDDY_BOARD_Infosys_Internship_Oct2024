import { Component, Input, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-deck-details',
  standalone: true,
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css'],
  imports: [CommonModule]
})
export class DeckDetailsComponent implements OnInit {
  currentIndex = 2;
  deckTitle = "Operating Systems";

  @Input() createdOn: string = "12th Feb"; 
  @Input() createdBy: string = "BabaRam"; 
  likesCount: number = 0;
  deckId: string = "operatingSystemsDeck"; 

  cards = [
    { title: "Processes", description: "Description about Processes" },
    { title: "Kernel", description: "Description about Kernel" },
    { title: "Multitasking", description: "The ability of the OS to run multiple programs apparently at the same time." },
    { title: "Input / Output", description: "Description about Input/Output" },
    { title: "User Interface", description: "Description about User Interface" }
  ];

  message: string | null = null;

  ngOnInit() {
    const storedLikes = localStorage.getItem(`likes_${this.deckId}`);
    this.likesCount = storedLikes ? +storedLikes : 0; 
  }

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
    this.likesCount++; 
    this.updateLikesStorage();
    this.showMessage("This deck was added to favorites!");
  }

  dislikeDeck() {
    if (this.likesCount > 0) {
      this.likesCount--;
      this.updateLikesStorage();
      this.showMessage("You have removed the deck from favorites.");
    }
  }

  private updateLikesStorage() {
    localStorage.setItem(`likes_${this.deckId}`, this.likesCount.toString());
  }

  private showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
