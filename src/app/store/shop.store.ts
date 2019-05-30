import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { Shop } from '../model/shop';

@Injectable()
export class ShopDataStore {

  public static readonly PATH = '/shops';

  constructor(
    private api: ApiService
  ) {}

  findAll(): Observable<Shop[]> {
    return this.api.afs.collection<Shop>(ShopDataStore.PATH).valueChanges()
  }

  findById(id: string): Observable<Shop> {
    return this.api.afs.doc<Shop>(ShopDataStore.PATH+`/${id}`).valueChanges()
  }

  update(id: string, params: {[key: string]: any}) {
    this.api.afs.doc(ShopDataStore.PATH+`/${id}`).update(params);
  }
}