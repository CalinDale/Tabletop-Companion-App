import { AttributeService } from './../attribute.service';
import { CharacterService } from './../character.service';
import { Character } from './../character';
import { Component, OnInit } from '@angular/core';
import { map } from '../../../node_modules/rxjs/operators';
import { Attribute } from './../attribute';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  characters: Character[] = [];
  numAttributeColumns = 5;
  attributeColumns: Attribute[] = [];
  attributeColumnOptions: Attribute[];
  currentActor = 3;

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService
  ) { }

  ngOnInit() {
    this.retrieveCharacters();
    this.prepareAttributeColumns();
  }

  retrieveCharacters() {
    this.characterService.getCharactersTracker().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(characters => {
      this.characters = characters;
    });
  }

  /* ngFor only works with items in a collection, so you need to make an array
    to have it incriment a number of times */
  prepareAttributeColumns() {
    for ( let i = 0; i < this.numAttributeColumns; i++ ) {
      this.attributeColumns.push(new Attribute());
    }
  }

  nextTurn() {
    this.currentActor++;
    if (this.currentActor >= this.characters.length) {
      this.currentActor = 0;
    }
  }
  prevTurn() {
    this.currentActor--;
    if (this.currentActor < 0) {
      this.currentActor =  this.characters.length - 1;
    }
  }
}
