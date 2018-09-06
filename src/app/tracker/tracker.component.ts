import { Character } from '../character';
import { TurnOrderService } from '../turn-order.service';
import { Component, OnInit, Attribute } from '@angular/core';
import { MessageService } from '../message.service';
import { CharacterPageComponent } from '../character-page/character-page.component';
import { CHARACTERS } from '../mock-characters';
import { ATTRIBUTES } from '../mock-characters';


@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  attributes = ATTRIBUTES;
  currentAttributes: any[];

  characters = CHARACTERS;

  maxN = this.characters.length;
  actingPosition = 1;

  constructor() {}

  ngOnInit() {
  }

  nextTurn() {
    this.actingPosition += 1;
    if (this.actingPosition === this.maxN + 1) {
      this.actingPosition = 1;
    }
  }

  previousTurn() {
    this.actingPosition -= 1;
    if (this.actingPosition === 0) {
      this.actingPosition = this.maxN;
    }
  }

  selectedCharacter(postition: number): string {
    if ( postition === this.actingPosition) {
      return 'ACTIVE';
    }
  }

  getAttributes(key: string) {
    this.currentAttributes = [] ;

    this.attributes.forEach( (element) => {
      if (element.characterID === key) {
        this.currentAttributes.push( element );
      }
    });


  }
}
