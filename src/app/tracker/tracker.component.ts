import { CharacterService } from './../character.service';
import { AttributeService } from './../attribute.service';
import { Character } from '../character';
import { TurnOrderService } from '../turn-order.service';
import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';
import { Attribute } from '../attribute';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  @Input() attribute: Attribute;
  @Input() character: Character;

  characterID: any;

  ngOnInit() {
    this.getCharacter();
  }

  constructor(private attributeService: AttributeService,
  private characterService: CharacterService) {
  }

  getCharacter() {
    this.characterID = this.characterService.getCharacterID();
    this.characterService.getCharacter(this.characterID);
  }

  removeCharacter() {
    this.characterService.setCharacterID(this.character.key);
    this.character.userID = firebase.auth().currentUser.uid;
    this.character.tracked = false;
    this.characterService.updateCharacter(this.character);
  }


}
