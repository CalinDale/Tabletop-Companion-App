import { CharacterService } from './../character.service';
import { AttributeService } from './../attribute.service';
import { Character } from '../character';
import { TurnOrderService } from '../turn-order.service';
import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';
import { Attribute } from '../attribute';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
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
  }

}
