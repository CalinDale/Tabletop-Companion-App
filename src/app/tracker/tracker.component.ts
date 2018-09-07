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

  ngOnInit() {
    this.getCharacterID();
    this.getAttributes();
  }

  constructor(private attributeService: AttributeService,
  private characterService: CharacterService) {
  }

  getCharacterID() {
    this.characterService.setCharacterID(this.character.key);
  }

  getAttributes() {
    this.characterID = this.characterService.getCharacterID();
    this.attributeService.getAttributesTracker().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.attribute = attributes;
    });
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
    console.log(attribute);
  }


}
