import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { MessageDataStore } from './store/message.store';
import { Message } from './model/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  newMessageCount: number = 0;

  constructor(
    public auth: AuthService,
    private router: Router,
    private messageDataStore: MessageDataStore
    ) {}

    ngOnInit() {
      this.fetch()
    }

    fetch() {
      if (this.auth.authState) {
        this.auth.user.subscribe(v => {
          this.messageDataStore.whereByUserId(v.id).subscribe((docs: Message[]) => {
            this.newMessageCount += docs.filter((v: Message) => { return !v.is_watch }).length
          })
        });
        this.messageDataStore.findPublicMessage().subscribe((docs: Message[]) => {
          this.newMessageCount += docs.filter((v: Message) => { return !v.is_watch }).length
        });
      }
    }
    
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
