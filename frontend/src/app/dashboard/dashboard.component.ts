import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  favoriteDecksCount = 5; // Replace with dynamic value if needed
  publicDecks = [
    { name: 'Deck 1', likes: 20 },
    { name: 'Deck 2', likes: 15 },
    { name: 'Deck 3', likes: 10 },
  ];
}
