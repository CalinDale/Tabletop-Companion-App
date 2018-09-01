import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './user';

import { EmailPasswordCredentials } from '../core/emailPasswordCredentials';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  authState: any = null;

  user: Observable<firebase.User>;



  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });

    {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    }

  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current Users data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Is Anonymous
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns display name
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest'; }
    if (this.currentUserAnonymous) { return 'Anonymous'; }
    { return this.authState['displayName'] || 'User without a Name'; }
  }

  // Social Sigins

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  // Anonymous Auth
  anonymousLogin() {

    return this.afAuth.auth.signInAnonymously()
    .then((credential ) => {
      this.updateUserData(credential.user);
    })
    .catch(error => console.log(error));
  }

  // Email/Password Auth
  emailSignUp(email: string, password: string ) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUserData(credential.user);
        // this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }


  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData(user);
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log( 'email sent' ))
      .catch((error) => console.log(error));
  }

  private handleError(error){
    console.error(error);
    // To donotify the user
  }

  updateUser(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data);
  }

  // Change to setUserDoc?
  updateUserData(user) {
    // Sets user data to firestore on login
    console.log('Update called');
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}
