import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';
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
  savedDeck: { title: string; description: string } | null = null; // Simulate saved deck
  feedbackMessage: string = ''; // Success or error feedback
  @Input() isModalVisible: boolean = false; 
  @Input() isSuccess:Boolean | null = null;;
  @Output() passedDeckFormData =new EventEmitter<{ title: string; description: string }>();

  constructor(private fb: FormBuilder) {
    this.deckForm = this.fb.group({
      deckName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
      ],
      description: ['', [Validators.maxLength(500)]],
    });
  }
  onSubmit(): void {
    if (this.deckForm.valid) {
      const { deckName, description } = this.deckForm.value;
      const deckData = { title: deckName, description: description };
  
      this.feedbackMessage = 'Saving deck...'; // Indicate processing
      this.passedDeckFormData.emit(deckData); // Emit the data to the parent
      
    } else {
      this.feedbackMessage = 'Error: Please fix the form errors before saving.';
    }
  }
  

  onCancel(): void {
    this.deckForm.reset({
      deckName: '',
      description: '',
    });
    this.feedbackMessage = '';
    this.savedDeck = null;
    this.isModalVisible = false;
    this.isSuccess=null;
  }

  ngOnChanges(): void {
    // Update feedback message based on `isSuccess` changes
    if (this.isSuccess === true) {
      this.feedbackMessage = 'Deck successfully saved!';
      this.deckForm.reset({
        deckName: '',
        description: '',
      });
    } else if (this.isSuccess === false) {
      this.feedbackMessage = 'Error: Failed to save the deck. Please try again.';
    }
  }

}
