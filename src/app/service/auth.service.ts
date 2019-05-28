import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User | null>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  
  currentUserId(): string {
    return this.afAuth.auth.currentUser.uid
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        return console.log(user.user);
      })
      .catch(err => console.log(err));
  }

  // 新規登録
  signup(email: string, password: string) {

  }

  // Google 認証
  googleAuth() {
    
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  private updateUserData(user: User) {
    const docUser: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.id}`);
    const data: User = {
      id: user.id,
      mail: user.mail,
      role: user.role || 0
    };
    return docUser.set(data);
  }
}
