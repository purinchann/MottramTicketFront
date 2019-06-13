import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { User } from './../model/user';

@Injectable()
export class UserDataStore {

  public static readonly PATH = '/users';

  constructor(
    private api: ApiService
  ) {}

  findById(id: string): Observable<User> {
    return this.api.afs.doc<User>(UserDataStore.PATH+`/${id}`).valueChanges()
  }

  add(params: {[key: string]: any}): Promise<boolean> {
     return this.api.afs.collection(UserDataStore.PATH+`/${params['id']}`).add(params).then(res => {
         return true
     }).catch(error => {
         return false
     })
  }

  update(id: string, params: {[key: string]: any}) {
    this.api.afs.doc(UserDataStore.PATH+`/${id}`).update(params);
  }
}