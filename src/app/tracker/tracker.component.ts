import { TrackerService } from './../tracker.service';
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
  currentActor = 0;

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService,
    private trackerService: TrackerService
  ) { }

  ngOnInit() {
    this.trackerService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });

    this.trackerService.getAttributeColumns().subscribe(attributeColumns => {
      this.attributeColumns = attributeColumns;
    });

    this.trackerService.getCurrentActor().subscribe(currentActor => {
      this.currentActor = currentActor;
    });
  }

  // Old code
  // retrieveCharacters() {
  //   this.characterService.getCharactersTracker().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  //     )
  //   ).subscribe(characters => {
  //     this.characters = characters;
  //   });
  // }

  /* ngFor only works with items in a collection, so you need to make an array
    to have it incriment a number of times */

  nextTurn() {
    this.trackerService.nextTurn();
    this.trackerService.getCurrentActor().subscribe(currentActor => {
      this.currentActor = currentActor;
    });
  }
  prevTurn() {
    this.trackerService.prevTurn();
    this.trackerService.getCurrentActor().subscribe(currentActor => {
      this.currentActor = currentActor;
    });
  }
}
