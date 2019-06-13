import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MessageDataStore } from 'src/app/store/message.store';
import { Message } from 'src/app/model/message';
import * as moment from 'moment/moment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  messageList: Message[];

  constructor(
    public auth: AuthService,
    private router: Router,
    private messageDataStore: MessageDataStore,
    private appComp: AppComponent
  ) { }

  ngOnInit() {
    this.fetch()
  }

  fetch() {
    if (this.auth.authState) {
      this.auth.user.subscribe(v => {
        this.messageDataStore.whereByUserId(v.id).subscribe((docs: Message[]) => {
          this.messageList = docs
          this.appComp.newMessageCount = docs.filter((v: Message) => { return !v.is_watch }).length
        })
      });
    }
  }

  convertDateFormat(unixtime_ms: number): string {
    return moment.unix(unixtime_ms/1000).format('MM月DD日 HH時mm分')
  }

  doWatched(id: string) {
    this.messageDataStore.updateByIsWatch(id).then(isRes => {
      if(isRes) {
        this.fetch()
      }
    });
  }

}
