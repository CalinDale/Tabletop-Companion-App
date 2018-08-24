import { MessageService } from './message.service';
import { Character } from './character';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from '../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private dbPath = '/characters';

  charactersRef: AngularFireList<Character> = null;

  constructor(
    private db: AngularFireDatabase
  ) { this.charactersRef = db.list(this.dbPath); }

  createCharacter(character: Character): void {
    this.charactersRef.push(character);
  }


  updateCharacter(charId: string, value: any): void {
    this.charactersRef.update(charId, value).catch(error => this.handleError(error));
  }

  deleteCharacter(charId: string): void {
    this.charactersRef.remove(charId).catch(error => this.handleError(error));
  }

  getCharactersList(): AngularFireList<Character> {
    return this.charactersRef;
  }

  deleteAll(): void {
    this.charactersRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
