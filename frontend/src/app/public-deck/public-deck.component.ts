import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-public-deck',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './public-deck.component.html',
  styleUrl: './public-deck.component.css'
})
export class PublicDeckComponent {
  publicDecks = [
    { name: 'Advanced Algebra', author: 'John Doe', likes: 250 },
    { name: 'World History 101', author: 'Jane Smith', likes: 300 },
    { name: 'Astronomy Basics', author: 'Neil Tyson', likes: 180 },
    { name: 'Introduction to Python', author: 'Alice Cooper', likes: 220 },
    { name: 'Modern Art Movements', author: 'Emma Brown', likes: 145 },
    { name: 'Quantum Physics', author: 'Alex Johnson', likes: 275 },
    { name: 'Shakespearean Plays', author: 'William Tate', likes: 190 },
    { name: 'French Grammar', author: 'Claire Dupont', likes: 165 },
    { name: 'Digital Marketing', author: 'Sophia Lee', likes: 210 },
    { name: 'Environmental Science', author: 'Mike Ross', likes: 240 },
    { name: 'Biochemistry Simplified', author: 'Rachel Green', likes: 170 },
    { name: 'World Mythology', author: 'Ross Geller', likes: 195 },
    { name: 'Philosophy of Mind', author: 'Monica Bing', likes: 230 },
    { name: 'Game Development', author: 'Chandler Bing', likes: 310 },
    { name: 'Cultural Anthropology', author: 'Phoebe Buffay', likes: 205 },
    { name: 'Economics for Beginners', author: 'Walter White', likes: 265 },
    
  ];
}
