import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    public auth: AuthService,
    private router: Router
    ) {}

  toLogin() {
    this.router.navigate(['/login'])
  }

  toSignup() {
    this.router.navigate(['/signup'])
  }

  logout() {
    this.auth.logout();
  }
}
