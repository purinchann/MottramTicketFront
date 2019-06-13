import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class MessageDataStore {

  public static readonly PATH = '/messages';
  messageList: Message[] = [];

  constructor(
    private api: ApiService
  ) {}

  whereByUserId(uid: string): Observable<Message[]> {
      return this.api.afs.collection<Message>(MessageDataStore.PATH, ref => ref.where('user_id', '==', uid)).valueChanges()
  }

  updateByIsWatch(id: string): Promise<boolean> {
    return this.api.afs.doc(MessageDataStore.PATH+`/${id}`).update({'is_watch': true}).then(() => {
        return true
    }).catch(err => {
        return false
    })
  }
}