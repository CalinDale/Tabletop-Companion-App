import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { AttributeService } from '../attribute.service';
import { MessageService } from '../message.service';
import { map } from 'rxjs/operators';
import { Character } from '../character';

@Component({
  selector: 'app-give-tracker',
  templateUrl: './give-tracker-character.component.html',
  styleUrls: ['./give-tracker-character.component.css']
})
export class GiveTrackerComponent implements OnInit {

  characterID: any;
  characters: any;
  character: Character = new Character();
  currentAttributes: any = [];
  attributes: any = [];

  maxN: number;
  actingPosition = 1;



  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.characterService.getCharactersTracker().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(characters => {
      this.characters = characters;
    });
  }

  getAttributesTracked() {
    this.attributeService.getAttributesTracker().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.currentAttributes = attributes;
    });
  }

  moveUp(character: Character, index: number) {
    if (index > 0) {
      const tmp = this.characters[index - 1];
      this.characters[index - 1] = this.characters[index];
      this.characters[index] = tmp;
    } else {
      const tmp = this.characters[ index ];
      const max = this.characters.length;
      let i = 1;
      this.characters.forEach((element) => {
        if ( this.characters !== max) {
          this.characters[i - 1] = this.characters[i];
          i ++;
        }
      });

      this.characters[max - 1] = tmp;
    }
  }

  moveDown(character: Character, index: number) {
    if (index < this.characters.length - 1) {
      const tmp = this.characters[index + 1];
      this.characters[index + 1] = this.characters[index];
      this.characters[index] = tmp;
    } else {
      const tmp = this.characters[ index ];
      const max = this.characters.length;
      let i = 1;
      this.characters.forEach((element) => {
        if ( this.characters !== max - 1 ) {
          this.characters[i + 1] = this.characters[i];
          i --;
        }
      });

      this.characters[0] = tmp;
    }
  }

  nextTurn() {
    this.actingPosition += 1;
    if (this.actingPosition === this.characters.length + 1) {
      this.actingPosition = 1;
    }
  }

  previousTurn() {
    this.actingPosition -= 1;
    if (this.actingPosition === 0) {
      this.actingPosition = this.characters.length;
    }
  }

  moveSelector(postition: number) {
    this.actingPosition = postition;
  }

  selectedCharacter(postition: number): string {
    if ( postition === this.actingPosition) {
      return '>';
    }
  }
}



