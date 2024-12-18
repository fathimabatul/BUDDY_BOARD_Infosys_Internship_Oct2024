export interface Deck {
    _id: string;
    title: string;
    cards: string[] | null;
    created_by: string;
    visibility: string;
    is_blocked: boolean;
    favorites: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    decks: Deck[];
    decksCount: number;
    likesCount: number;
  }
  
  export type UserSearchResponse = User[];
  