import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable()
export class CartDataStore {

  public static readonly PATH = '/carts';

  constructor(
    private api: ApiService
  ) {}

  add(params: {[key: string]: any}): Promise<boolean> {
    return this.api.afs.collection(CartDataStore.PATH).add(params)
    .then(docRef => {
        const id = docRef.id;
        return docRef.update({'id': id}).then(res2 => {
            return true
        }).catch(error => {
            return false
        })
    })
    .catch(error => {
        console.log(error)
        return false
    })
  }

  findAll(): Observable<Cart[]> {
    return this.api.afs.collection<Cart>(CartDataStore.PATH).valueChanges()
  }

  whereByUserId(uid: string) {
      return this.api.afs.collection<Cart[]>(CartDataStore.PATH, ref => ref.where('user_id', '==', uid)).valueChanges()
  }
}