import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable()
export class OrderDataStore {

  public static readonly PATH = '/orders';

  constructor(
    private api: ApiService
  ) {}

  add(params: {[key: string]: any}): Promise<boolean> {
    return this.api.afs.collection(OrderDataStore.PATH).add(params)
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

  whereByUserId(uid: string): Observable<Order[]> {
    return this.api.afs.collection<Order>(OrderDataStore.PATH, ref => ref.where('user_id', '==', uid)).valueChanges()
  }

  update(id: string, params: {[key: string]: any}): Promise<boolean> {
    return this.api.afs.doc(OrderDataStore.PATH+`/${id}`).update(params).then(() => {
        return true
    }).catch(err => {
        return false
    })
  }
}