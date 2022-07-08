import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import * as firebase from 'firebase/auth';

export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  roles: Roles;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
      catchError((err) => of(new Error(err)))
    );
  }

  async isLoggedIn() {
    return this.user$.pipe(
      map((a) => {
        console.log(a);
        return a;
      })
    );
  }

  async googleLogin() {
    const provider = new firebase.GoogleAuthProvider();
    return await this.oAuthLogin(provider);
  }
  private async oAuthLogin(provider: any) {
    await this.afAuth.signInWithPopup(provider).then((cred) => {
      this.updateUserData(cred.user);
    });
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(user);
    
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        subscriber: true,
        editor: false,
        admin: false,
      },
    };
    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
  }

  /* Abilities and Roles Authorization */
  /* Assign roles to an ability method */
  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }
  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }
  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role as keyof Roles]) {
        return true;
      }
    }
    return false;
  }
}
