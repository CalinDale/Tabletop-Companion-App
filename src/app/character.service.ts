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

  constructor(private db: AngularFireDatabase, private attributeService: AttributeService, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
       { this.userID = firebase.auth().currentUser.uid; }
       console.log(this.userID);
    });
    this.charactersRef = this.db.list(`characters/${this.userID}`);
  }

  createCharacter(character: Character): void {
    this.charactersRef.push(character);
  }

  updateCharacter(character: Character): void {
    this.characterID = this.attributeService.getCharacterID();
    this.characterRef = this.db.object(`characters/${this.userID}/${this.characterID}`);
    this.characterRef.update(character).catch(error => this.handleError(error));
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

  getCharacter(key: string) {
    this.characterRef = this.db.object(`characters/${this.userID}/${key}/`);
    return this.characterRef;

  }

  deleteAll(): void {
    this.charactersRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
