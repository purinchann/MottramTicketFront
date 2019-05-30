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

  whereByUserId(uid: string): Observable<Cart[]> {
      return this.api.afs.collection<Cart>(CartDataStore.PATH, ref => ref.where('user_id', '==', uid)).valueChanges()
  }

  update(id: string): Promise<boolean> {
    return this.api.afs.doc(`${CartDataStore.PATH}/${id}`).update({'is_order': true}).then(res => {
      return true
    }).catch(err => {
      return false
    })
  }

  delete(id: string): Promise<boolean> {
    return this.api.afs.doc(`${CartDataStore.PATH}/${id}`).delete().then(() => {
      return true
    }).catch(err => {
      return false
    })
  }
}