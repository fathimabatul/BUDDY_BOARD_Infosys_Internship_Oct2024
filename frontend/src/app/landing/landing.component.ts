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
  toggleOverlay(): void {
    this. isModalVisible= !this.isModalVisible;
  }
}
