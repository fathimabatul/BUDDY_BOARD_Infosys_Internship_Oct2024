import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css'],
})
export class FlashcardComponent {
  flashcardForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.flashcardForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      tags: [''], // optional field
      deckAssignment: ['', Validators.required], // required field
    });
  }

  onSave() {
    if (this.flashcardForm.valid) {
      const formData = this.flashcardForm.value;

      // API Call to save the flashcard
      this.http.post('api/card/', formData).subscribe({
        next: (response) => {
          console.log('Card saved successfully:', response);
          alert('Flashcard saved successfully!');
          this.flashcardForm.reset(); // Reset the form after success
        },
        error: (error) => {
          console.error('Error saving flashcard:', error);
          alert('Failed to save flashcard. Please try again.');
        },
      });
    } else {
      alert('Please fill in all required fields before saving.');
    }
  }

  onCancel() {
    this.flashcardForm.reset();
  }
}
