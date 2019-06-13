import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
//import { Meta } from '@angular/platform-browser';

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
    //private meta: Meta
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

    // this.meta.addTags([
    //   { name: 'viewport', content: 'width=device-width,initial-scale=1'},
    //   { name: 'description', content: '【モッチャムチケット】はあなたの代わりにモッチャムの行列に並び、あなたが飲みたいタピオカを手に入れて、あなたにお渡しするタピオカ整理券サービスです。'},
    //   { name: 'keywords', content: 'モッチャム,整理券,モッチャム 時間,モッチャム 待ち,モッチャム 並ぶ'},
    //   { name: 'og:locale', content: 'ja_JP'},
    //   { name: 'og:url', content: '/login' },
    //   { name: 'og:title', content: 'これからのモッチャムはいつでもお手軽にゲットしよう！' },
    //   { name: 'og:description', content: 'これからのモッチャムはいつでもお手軽にゲットしよう！' },
    //   { name: 'twitter:card', content: 'summary' },
    //   { name: 'twitter:title', content: 'モッチャムチケット'},
    //   { name: 'twitter:description', content: 'モッチャムチケット ログイン画面'}
    // ]);
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

  toLogin() {
    this.router.navigate(['/login'])
  }
}
