import { Injectable } from '@angular/core';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  __v: number;
}

@Injectable({
  providedIn: 'root',
})
export class userService {

  constructor() {}

  // Function to get the user details from localStorage
  getUserFromLocalStorage(): User | null {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
    return null; // Return null if no user data is found
  }
}
