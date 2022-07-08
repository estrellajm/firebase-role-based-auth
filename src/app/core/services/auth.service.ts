import { Injectable, NgZone } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Roles, User } from './user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null | undefined>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      })
    );
  }

  async signOut() {
    await this.afAuth.signOut();
    this.route('/');
  }

  /*** Login/Signup ***/

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    await this.oAuthLogin(provider);
  }

  async registerUser(email: string, password: string) {
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        this.route('/home');
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
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

  /*** PRIVATE METHODS ***/

  private route(route: string) {
    this.ngZone.run(() => {
      this.router.navigateByUrl(route);
    });
  }

  private async oAuthLogin(provider: GoogleAuthProvider) {
    const credential = await this.afAuth.signInWithPopup(provider);
    this.updateUserData(credential.user);
  }

  private updateUserData(user: firebase.User | null) {
    if (!user) return;
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
