import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './../model/user';
import { UserDataStore } from '../store/user.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: Observable<firebase.User>;
  user: Observable<User | null>;

  constructor(
    private router: Router,
    private userDataStore: UserDataStore,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.authState = afAuth.authState
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

  signup(email: string, password: string): Promise <void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( user => {
      this.updateUserData(user.user.uid, user.user.email)
    }).catch((error: firebase.FirebaseError) => {
      console.log(error)
    })
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: auth.GoogleAuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      const uid = credential.user.uid, email = credential.user.email
      this.updateUserData(credential.user.uid, credential.user.email)
    })
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  private updateUserData(uid: string, email: string) {
    const docUser: AngularFirestoreDocument<User> = this.afStore.doc(`users/${uid}`);
    const params = {
      'id': uid,
      'mail': email,
      'role': 0
    }
    return docUser.set(params);
  }

  _user(): Observable<User> {
    return Observable.create((observer) => {
      this.authState.subscribe(user => {
        if (!user) {
          observer.complete();
          return;
        }
 
        this.userDataStore.findById(user.uid).subscribe(
            user => {
              observer.next(user);
              observer.complete();
            },
            error => {
              observer.complete();
            }        
        );
      });  
    });
  }

  isAuthcated(): Observable<boolean> {
    return Observable.create((observer) => {
      this.authState.subscribe(user => {
        if (!user){
          observer.next(false);
          observer.complete();
          return;
        }
        this.userDataStore.findById(user.uid).subscribe(
          user => { 
            observer.next(true);
            observer.complete();  
          },
          error => {
            observer.next(false);
            observer.complete();
          }
        );
      });
    })
  }

}
