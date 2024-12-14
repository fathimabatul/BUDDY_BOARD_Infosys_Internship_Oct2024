import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../services/user-profile.service';

interface User {
  email: string;
  joined: string;
  decks: string[];
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  username: string = '';
  isAdmin: boolean = false;
  navOptions: string[] = [];
  user: User | null = null;
  loading: boolean = true;

  maxVisibleDecks: number = 4;
  limitedDecks: string[] = [];
  showModal: boolean = false;

  errorMessage: string = ''; // To store error messages

  constructor(private route: ActivatedRoute, private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || 'Unknown User';

    this.userProfileService.getUserProfile(this.username).subscribe(
      (data: User) => {
        this.user = data;
        this.isAdmin = this.username === 'admin';
        this.navOptions = this.isAdmin ? ['Users', 'Decks', 'Logout'] : ['Feed', 'Cards', 'Decks', 'Logout'];
        this.limitedDecks = this.user.decks.slice(0, this.maxVisibleDecks);
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
        this.errorMessage = 'Unable to fetch user data. Please try again later.';
        this.loading = false;
      }
    );
  }

  showAllDecks() {
    if (this.user?.decks?.length) {
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
