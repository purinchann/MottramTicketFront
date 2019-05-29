import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

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
    this.signupForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  signup() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.auth.signup(email, password).then(() => {
      this.router.navigate(['/dashboard']);
    })
  }

  googleSignup() {
    this.auth.googleLogin().then(res => {
      this.router.navigate(['/']);
    });
  }
}
