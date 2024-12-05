import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-deck',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './favorite-deck.component.html',
  styleUrl: './favorite-deck.component.css'
})
export class FavoriteDeckComponent {
  favoriteDecks = [
    { name: 'Math Basics', author: 'John Doe' },
    { name: 'Science Trivia', author: 'Jane Smith' },
    { name: 'World Geography', author: 'Emma Watson' },
    { name: 'History Facts', author: 'Alex Johnson' },
    { name: 'Programming Fundamentals', author: 'Alice Cooper' },
    { name: 'Art and Culture', author: 'Mike Ross' },
    { name: 'Physics Simplified', author: 'Rachel Green' },
    { name: 'Biology Insights', author: 'Ross Geller' },
    { name: 'Modern Literature', author: 'Monica Bing' },
    { name: 'Chemistry Basics', author: 'Chandler Bing' },
    { name: 'Space Exploration', author: 'Joey Tribbiani' },
    { name: 'Psychology 101', author: 'Phoebe Buffay' },
    { name: 'Economics Explained', author: 'Walter White' },
    { name: 'Music Theory', author: 'Jesse Pinkman' },
    { name: 'Philosophy and Ethics', author: 'Hannah Montana' }
  ];
}
