import { MessageService } from './message.service';
import { Character } from './character';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private charactersUrl = 'api/characters';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.charactersUrl);
  }

  getCharacterById(id: number ): Observable<Character> { return null; }

  saveCharacter(): void {}

  removeCharacter(): void {}

  addCharacter(): void {}
}
