import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ensure ReactiveFormsModule is imported
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css'],
})
export class FlashcardComponent {
  flashcardForm: FormGroup; // Correctly define FormGroup

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private router: Router
  ) {
    // Initialize the form with validators
    this.flashcardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]], // Title is required, minimum 5 characters
      content: ['', [Validators.required, Validators.minLength(10)]], // Content is required, minimum 10 characters
    });
  }

  /**
   * Handles the submission of the flashcard form.
   * Sends the data to the backend using the CardService.
   */
  onSave(): void {
    if (this.flashcardForm.invalid) {
      return;
    }

    const { title, content } = this.flashcardForm.value;

    this.cardService.createCard(title, content).subscribe({
      next: () => {
        console.log('Card created successfully.');
        this.router.navigate(['/cardpage']); // Redirect to the card page
      },
      error: (error) => {
        console.error('Error creating card:', error);
      },
    });
  }

  /**
   * Handles the cancel button click.
   */
  onCancel(): void {
    this.router.navigate(['/cardpage']);
  }
}
