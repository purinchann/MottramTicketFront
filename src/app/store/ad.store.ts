import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { Ad } from '../model/ad';

@Injectable()
export class AdDataStore {

  public static readonly PATH = '/ads';

  constructor(
    private api: ApiService
  ) {

  }

  find(): Observable<Ad> {
    return this.api.afs.doc<Ad>(AdDataStore.PATH+`/0`).valueChanges()
  }
}