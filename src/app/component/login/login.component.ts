import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) { 
    this.auth.user.subscribe(user => {
      if (user !== null) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.auth.login(email, password)
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  googleLogin() {
    this.auth.googleLogin().then(res => {
      this.router.navigate(['/']);
    });
  }

  toSignup() {
    this.router.navigate(['/signup'])
  }
}
