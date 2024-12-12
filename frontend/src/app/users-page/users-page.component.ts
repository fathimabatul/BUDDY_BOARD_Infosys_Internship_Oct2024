import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Service for API calls
import { User } from '../models/user.model'; // Interface for User data

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  searchKeyword: string = '';
  exactMatch: boolean = false;
  likesThreshold: number = 0;
  decksThreshold: number = 0;
  joinedAfter: string | null = null;

  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = [...this.users]; // Initially show all users
    });
  }

  searchUsers(): void {
    this.filteredUsers = this.users.filter((user) => {
      const matchesKeyword = this.exactMatch
        ? user.username.toLowerCase() === this.searchKeyword.toLowerCase()
        : user.username.toLowerCase().includes(this.searchKeyword.toLowerCase());
      const matchesLikes = user.likesCount >= this.likesThreshold;
      const matchesDecks = user.decksCount >= this.decksThreshold;
      const matchesDate =
        !this.joinedAfter || new Date(user.joinedDate) >= new Date(this.joinedAfter);

      return matchesKeyword && matchesLikes && matchesDecks && matchesDate;
    });
  }
}

