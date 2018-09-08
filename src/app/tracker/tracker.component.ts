import { Character } from '../character';
import { TurnOrderService } from '../turn-order.service';
import { Component, OnInit, Attribute, AfterViewInit } from '@angular/core';
import { MessageService } from '../message.service';
import { CharacterPageComponent } from '../character-page/character-page.component';
import { CHARACTERS } from '../mock-characters';
import { ATTRIBUTES } from '../mock-characters';
import { TouchSequence } from '../../../node_modules/@types/selenium-webdriver';


@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit, AfterViewInit {

  attributes = ATTRIBUTES;
  currentAttributes: any[];
  charIDList: string[] = [];

  characters = CHARACTERS;

  maxN = this.characters.length;
  actingPosition = 1;

  constructor() {
    this.getAttributes('1');
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

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

  moveSelector(postition: number) {
    this.actingPosition = postition;
  }

  selectedCharacter(postition: number): string {
    if ( postition === this.actingPosition) {
      return '>';
    }
  }

  resetList() {
    this.currentAttributes = [] ;
  }


  getAttributes(key: string) {

    this.resetList();

    this.attributes.forEach( (element) => {
      if (element.characterID === key) {
        this.currentAttributes.push( element );
      }
    });
  }

}
