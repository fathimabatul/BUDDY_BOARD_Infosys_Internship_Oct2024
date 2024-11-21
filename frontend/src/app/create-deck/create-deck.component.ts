import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-deck',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-deck.component.html',
  styleUrl: './create-deck.component.css'
})

export class CreateDeckComponent {
  deckForm: FormGroup;
  savedDeck: { title: string; visibility: string } | null = null; // Simulate saved deck
  feedbackMessage: string = ''; // Success or error feedback
  @Input() isModalVisible: boolean = false; 
  toggleOverlay(): void {
    this. isModalVisible= !this.isModalVisible;
  }
  
  constructor(private fb: FormBuilder) {
    this.deckForm = this.fb.group({
      deckName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
      ],
      description: ['', [Validators.maxLength(500)]],
      visibility: ['Private'] // Default to Private
    });
  }
  onSubmit(): void {
    if (this.deckForm.valid) {
      const { deckName, visibility } = this.deckForm.value;
      this.savedDeck = { title: deckName, visibility };
      this.feedbackMessage = 'Deck successfully saved!';
      this.deckForm.reset({
        deckName: '',
        description: '',
        visibility: 'Private'
      });
    } else {
      this.feedbackMessage = 'Error: Please fix the form errors before saving.';
    }
  }

  onCancel(): void {
    this.deckForm.reset({
      deckName: '',
      description: '',
      visibility: 'Private'
    });
    this.feedbackMessage = '';
    this.savedDeck = null;
    this.isModalVisible = false;
  }

}
