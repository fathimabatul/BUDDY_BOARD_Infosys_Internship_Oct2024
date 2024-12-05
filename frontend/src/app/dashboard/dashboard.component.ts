import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  favoriteDecksCount = 5; // Replace with dynamic value if needed
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
    { name: 'Music History', author: 'Jesse Pinkman', likes: 185 },
    { name: 'Art of Negotiation', author: 'Hannah Montana', likes: 250 },
    { name: 'Blockchain Basics', author: 'Satoshi Nakamoto', likes: 290 },
    { name: 'Creative Writing', author: 'Mark Twain', likes: 215 }
  ];
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
