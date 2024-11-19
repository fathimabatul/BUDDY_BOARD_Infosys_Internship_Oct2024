import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-follow-up',
  standalone: true,
  imports: [CommonModule], // Ensure this is correctly imported
  templateUrl: './signup-follow-up.component.html',
  styleUrls: ['./signup-follow-up.component.scss'],
})
export class SignupFollowUpComponent {
  email!: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  navigateToSignIn(): void {
    this.router.navigate(['/signin']);
  }
}
