import { AttributeService } from './attribute.service';
import { CharacterService } from './character.service';
import { Character } from './character';
import { Injectable } from '@angular/core';
import { map } from '../../node_modules/rxjs/operators';
import { Attribute } from './attribute';
import { Observable, of } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  characters: Character[] = [];
  numAttributeColumns = 5;
  attributeColumns: Attribute[] = [];
  currentActor = 3;

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService
  ) {
    this.prepareAttributeColumns();
  }

  getCharacters(): Observable<Character[]> {
    const dbList = this.characterService.getCharactersTracker().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    dbList.subscribe(characters => {
      this.characters = characters;
    });
    return dbList;
  }

  getAttributes(characterKey): Observable<Attribute[]> {
    return this.attributeService.getAttributes(characterKey).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  prepareAttributeColumns() {
    for ( let i = 0; i < this.numAttributeColumns; i++ ) {
      this.attributeColumns.push(new Attribute());
    }
  }

  getAttributeColumns(): Observable<Attribute[]> {
    return of(this.attributeColumns);
  }

  getCurrentActor(): Observable<number> {
    return of(this.currentActor);
  }

  nextTurn() {
    this.moveMarkerDown();
  }

  moveMarkerDown() {
    this.currentActor++;
    this.checkMarkerPosition();
  }

  prevTurn() {
    this.moveMarkerUp();
  }

  moveMarkerUp() {
    this.currentActor--;
    this.checkMarkerPosition();
  }

  moveCharacterUp(index: number) {
    if (index > 0) {
      const tmp = this.characters[index - 1];
      this.characters[index - 1] = this.characters[index];
      this.characters[index] = tmp;
    } else {
      const tmp = this.characters[this.characters.length - 1];
      this.characters[0] = tmp;
      this.characters[this.characters.length - 1] = this.characters[index];
    }
  }
  moveCharacterDown(index: number) {
    if (index < this.characters.length - 1) {
      const tmp = this.characters[index + 1];
      this.characters[index + 1] = this.characters[index];
      this.characters[index] = tmp;
    } else {
      const tmp = this.characters[0];
      this.characters[this.characters.length - 1] = tmp;
      this.characters[0] = this.characters[index];
    }
  }

  // TODO: cause marker to move when characters are added or removed from tracker
  // Need to update the currentActor in commponents whenever it changes basically, observable stuff.
  addToTracker(character: Character) {
    this.characterService.trackCharacter(character);
    if ( this.characters.indexOf(character) <= this.currentActor) {
      this.moveMarkerDown();
    }

    let charAttributes: Attribute[] = [];
    this.attributeService.getAttributes(character.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      charAttributes = attributes;
    });
    for ( const attribute of charAttributes ) {
      this.attributeService.untrackAttribute(attribute);
    }
  }

  // TODO: cause marker to move when characters are added or removed from tracker
  // Need to update the currentActor in commponents whenever it changes basically, observable stuff.
  removeFromTracker(character: Character) {
    if ( this.characters.indexOf(character) <= this.currentActor) {
      this.moveMarkerUp();
    }
    this.characterService.untrackCharacter(character);

    let charAttributes: Attribute[] = [];
    this.attributeService.getAttributes(character.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      charAttributes = attributes;
    });
    for ( const attribute of charAttributes ) {
      this.attributeService.untrackAttribute(attribute);
    }
  }

  checkMarkerPosition() {
    if (this.currentActor >= this.characters.length) {
      this.currentActor = 0;
    } else if (this.currentActor < 0) {
      this.currentActor =  this.characters.length - 1;
    }
  }
}
