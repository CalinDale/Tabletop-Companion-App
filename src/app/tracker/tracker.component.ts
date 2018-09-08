import { CharacterService } from './../character.service';
import { AttributeService } from './../attribute.service';
import { Character } from '../character';
import { TurnOrderService } from '../turn-order.service';
<<<<<<< HEAD
import { Component, OnInit, Attribute, AfterViewInit } from '@angular/core';
import { MessageService } from '../message.service';
import { CharacterPageComponent } from '../character-page/character-page.component';
import { CHARACTERS } from '../mock-characters';
import { ATTRIBUTES } from '../mock-characters';
import { TouchSequence } from '../../../node_modules/@types/selenium-webdriver';

=======
import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';
import { Attribute } from '../attribute';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
>>>>>>> 6d8fed2aaef7cdea1037e45e82bca92699802f92

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
<<<<<<< HEAD
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
=======
export class TrackerComponent implements OnInit {

  @Input() character: Character;
  @Input() attributes: Attribute;

  characterID: any;
  attribute: any = [];
  attributess: any = [];
  show = false;

  ngOnInit() {
    this.getCharacterID();
    this.getAttributesTracked();
  }

  constructor(private attributeService: AttributeService,
  private characterService: CharacterService) {
  }

  getCharacterID() {
    this.characterService.setCharacterID(this.character.key);
  }

  getAttributesTracked() {
    this.attributeService.getAttributesTracker().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.attribute = attributes;
    });
  }

  getAttributes() {
    this.show = true;
    this.characterService.setCharacterID(this.character.key);
    this.attributeService.getAttributesNotTracked().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.attributess = attributes;
    });
  }

  addAttribute(attributes: Attribute) {
    this.attributeService.setAttributeID(attributes.key);
    attributes.tracked = true;
    attributes.characterID = this.characterService.getCharacterID();
    attributes.userID = firebase.auth().currentUser.uid;
    this.attributeService.updateAttribute(attributes);
  }

  removeCharacter() {
    this.characterService.setCharacterID(this.character.key);
    this.character.userID = firebase.auth().currentUser.uid;
    this.character.tracked = false;
    this.characterService.updateCharacter(this.character);
  }

  removeAttribute(attribute: Attribute) {
    this.attributeService.setAttributeID(attribute.key);
    attribute.tracked = false;
    attribute.userID = firebase.auth().currentUser.uid;
    this.attributeService.updateAttribute(attribute);
  }

  hideButton() {
    this.show = false;
>>>>>>> 6d8fed2aaef7cdea1037e45e82bca92699802f92
  }

}
