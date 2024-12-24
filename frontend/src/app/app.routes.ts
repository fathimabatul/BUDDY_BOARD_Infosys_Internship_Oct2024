// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LandingComponent } from './landing/landing.component';
import { SignupFollowUpComponent } from './signup-follow-up/signup-follow-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { DeckPageComponent } from './deck-page/deck-page.component';
import { DeckSearchComponent } from './deck-search/deck-search.component';
import { FavoriteDeckComponent } from './favorite-deck/favorite-deck.component';
import { PublicDeckComponent } from './public-deck/public-deck.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { CardsPageComponent } from './cards-page/cards-page.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSearchComponent } from './user-search/user-search.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./signin/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'signup-follow-up',
    component: SignupFollowUpComponent,
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'reset-password/:token',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'deck-details',
    component: DeckDetailsComponent,
  },
  {
    path: 'deckPage',
    component: DeckPageComponent,
  },
  {
    path: 'deck-search',
    component: DeckSearchComponent,
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'favoriteDecks',
    component: FavoriteDeckComponent,
  },
  {
    path: 'publicDecks',
    component: PublicDeckComponent,
  },
  {
    path: 'deck/:id',
    component: DeckDetailsComponent,
  },
  {
    path: 'flashcard',
    component: FlashcardComponent,
  },
  {
    path: 'cardpage',
    component: CardsPageComponent,
  },
  {
    path: 'card/:id',
    component: CardDetailsComponent,
  },
  {
    path: 'user-profile/:userid',
    component: UserProfileComponent,
  },
  {
    path: 'userSearch',
    component: UserSearchComponent
  },
  { path: 'card-details', component: CardDetailsComponent },
];
