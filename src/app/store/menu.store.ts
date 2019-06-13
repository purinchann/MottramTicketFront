import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { Menu } from '../model/menu';

@Injectable()
export class MenuDataStore {

  public static readonly PATH = '/menus';

  constructor(
    private api: ApiService
  ) {}

  findAll(): Observable<Menu[]> {
    return this.api.afs.collection<Menu>(MenuDataStore.PATH).valueChanges()
  }

  findById(id: string): Observable<Menu> {
    return this.api.afs.doc<Menu>(MenuDataStore.PATH+`/${id}`).valueChanges()
  }

  update(id: string, params: {[key: string]: any}) {
    this.api.afs.doc(MenuDataStore.PATH+`/${id}`).update(params);
  }
}