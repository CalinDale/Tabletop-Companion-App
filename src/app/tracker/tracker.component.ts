import { TrackerService } from '../tracker.service';
import { Character } from '../character';
import { Component, OnInit } from '@angular/core';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  characters: Character[] = [];
  // numAttributeColumns = 5;
  attributeColumns: Attribute[] = [];
  attributeColumnOptions: Attribute[];
  currentActor = 0;

  constructor(
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
