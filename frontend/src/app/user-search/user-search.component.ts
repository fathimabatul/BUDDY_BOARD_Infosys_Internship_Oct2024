import { Component, OnInit } from '@angular/core';
import { UserSearchService, UserSearchResponse } from '../services/user-search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit {
  searchKeyword: string = '';
  exactMatch: boolean = false;
  likesThreshold: number = 0;
  decksThreshold: number = 0;
  joinedAfter: string = '';
  userRole: string = 'user'; // Default role filter

  filteredUsers: UserSearchResponse[] = [];

  constructor(private usersService: UserSearchService) {}

  ngOnInit(): void {
    // Fetch all users on component load
    this.searchUsers();
  }

  searchUsers(): void {
    console.log('Searching users with filters:', {
      searchKeyword: this.searchKeyword,
      exactMatch: this.exactMatch,
      likesThreshold: this.likesThreshold,
      decksThreshold: this.decksThreshold,
      joinedAfter: this.joinedAfter,
      userRole: this.userRole,
    });

    this.usersService
      .searchUsers(
        this.searchKeyword,
        this.exactMatch,
        this.likesThreshold,
        this.decksThreshold,
        this.joinedAfter,
        this.userRole
      )
      .subscribe(
        (response) => {
          this.filteredUsers = response;
          console.log('User search results:', response);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  resetFilters(): void {
    console.log('Resetting filters to defaults');
    this.searchKeyword = '';
    this.exactMatch = false;
    this.likesThreshold = 0;
    this.decksThreshold = 0;
    this.joinedAfter = '';
    this.userRole = ''; // Reset to default role
    this.searchUsers(); // Perform search with reset filters
  }
}
