import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute to get route parameters
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileResponse, UserProfile, Deck } from '../models/user-profile.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: UserProfile | null = null; // User profile data
  loading: boolean = true; // Loading state
  errorMessage: string | null = null; // Error message
  navOptions: string[] = ['Option 1', 'Option 2', 'Option 3']; // Navigation options
  maxVisibleDecks: number = 3; // Maximum number of visible decks
  limitedDecks: string[] = []; // Limited decks for initial display
  showModal: boolean = false; // Modal visibility state

  constructor(
    private userProfileService: UserProfileService,
    private activatedRoute: ActivatedRoute // Inject ActivatedRoute to get the route parameter
  ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('userid');
    if (userId) {
      this.fetchUserProfile(userId);
    }
  }

  fetchUserProfile(id: string): void {
    this.userProfileService.getUserProfile(id).subscribe(
      (response: UserProfileResponse) => {
        this.loading = false;
        if (response.success) {
          this.user = response.data;
          console.log(this.user);
          
          this.limitedDecks = this.user.decks.slice(0, this.maxVisibleDecks).map(deck => deck.title);
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to fetch user data';
      }
    );
  }

  // Add this getter to prevent undefined errors in the template
  get userDecks(): Deck[] {
    return this.user?.decks || []; // Return an empty array if user or decks is undefined
  }

  showAllDecks(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}

