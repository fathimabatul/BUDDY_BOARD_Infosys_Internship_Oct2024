import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports:[RouterOutlet],
  styleUrls: ['./app.component.css'],
  standalone:true
})
export class AppComponent {
  title = 'frontend';
}
