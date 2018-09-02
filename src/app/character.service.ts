import { AngularFireAuth } from 'angularfire2/auth';
import { MessageService } from './message.service';
import { Character } from './character';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from '../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {


  charactersRef: AngularFireList<Character> = null;
  userID: string = firebase.auth().currentUser.uid;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
       { this.userID = firebase.auth().currentUser.uid; }
       console.log(this.userID);
    });
    this.charactersRef = this.db.list(`characters/${this.userID}`);
  }

  createCharacter(character: Character): void {
    this.charactersRef.push(character);
  }

  updateCharacter(key: string, value: any): void {
    this.charactersRef.update(key, value).catch(error => this.handleError(error));
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


  deleteAll(): void {
    this.charactersRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
