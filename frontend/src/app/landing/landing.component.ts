import { Component } from '@angular/core';
import { CreateDeckComponent } from '../create-deck/create-deck.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports:  [CreateDeckComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  isModalVisible: boolean = false; 
  isSuccess:boolean| null = null;
  savedDeck: { title: string; description: string }[] = []; ;
  toggleOverlay(): void {
    this. isModalVisible= !this.isModalVisible;
  }
  
  getDeckFormData(data: { title: string; description: string }): void {
    setTimeout(() => {
      this.isSuccess=true;
      if(this.isSuccess){
        // Append new deck to the savedDeck array
        this.savedDeck.push(data);
      }
      else{
        this.isSuccess=false;
      }
    }, 2000);

     
  }
}
