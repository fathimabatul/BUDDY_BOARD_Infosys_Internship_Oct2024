import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css'],
})
export class FlashcardComponent {
  flashcardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.flashcardForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      tags: [''], // optional field
      deckAssignment: ['', Validators.required], // required field
    });
  }

  onSave() {
    if (this.flashcardForm.valid) {
      console.log('Form Saved:', this.flashcardForm.value);
    }
  }

  onCancel() {
    this.flashcardForm.reset();
  }
}
