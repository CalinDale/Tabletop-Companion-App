import { AttributeService } from './attribute.service';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { MessageService } from './message.service';
import { Character } from './character';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from '../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  charactersRef: AngularFireList<Character> = null;
  userID: string = firebase.auth().currentUser.uid;
  characterRef: AngularFireObject<any> = null;
  // userID: string;
  character: Character;
  characterID: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
<<<<<<< HEAD
       if (user) { this.userID = user.uid; }
=======
      if (user) { this.userID = user.uid; }
>>>>>>> 6d8fed2aaef7cdea1037e45e82bca92699802f92
    });
    this.charactersRef = this.db.list(`characters/${this.userID}`);
  }

  setCharacterID(key: string) {
    if (key != null) {
      this.characterID = key;
    }
  }

  getCharacterID() {
    return this.characterID;
  }

  createCharacter(character: Character): void {
    this.charactersRef = this.db.list(`characters/${this.userID}`);
    this.charactersRef.push(character);
  }

  updateCharacter(character: Character): void {
    this.characterID = this.getCharacterID();
    this.characterRef = this.db.object(`characters/${this.userID}/${this.characterID}`);
    this.characterRef.update(character).catch(error => this.handleError(error));
  }

  getCharactersTracker() {
    if (!this.userID) {
      return;
    } else {
      this.charactersRef = this.db.list(`characters/${this.userID}`, ref => ref.orderByChild('tracked').equalTo(true));
      return this.charactersRef;
    }
  }

  deleteCharacter(key: string): void {
    this.charactersRef.remove(key).catch(error => this.handleError(error));
  }

  getCharactersList(): AngularFireList<Character> {
    if (!this.userID) {
      return;
    } else {
      this.charactersRef = this.db.list(`characters/${this.userID}`);
      return this.charactersRef;
    }
  }

<<<<<<< HEAD
=======
  getCharacter(key: string) {
    this.characterRef = this.db.object(`characters/${this.userID}/${key}/`);
    return this.characterRef;
  }

>>>>>>> 6d8fed2aaef7cdea1037e45e82bca92699802f92
  deleteAll(): void {
    this.charactersRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
