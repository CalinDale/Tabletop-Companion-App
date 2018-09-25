import { Attribute } from '../attribute';
import { CharacterListComponent } from '../character-list/character-list.component';
import { MessageService } from '../message.service';
import { CharacterService } from '../character.service';
import { AttributeService } from '../attribute.service';
import { Character } from '../character';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import * as firebase from 'firebase';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  @HostBinding('class.is-open')
  isOpen = false;

  @Input() characterListComponent: CharacterListComponent;

  character: Character;

  attributes: Attribute[];

  characterID: string;
  alive: boolean;

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService,
    private messageService: MessageService,
  ) {this.alive = true; }

  ngOnInit() {
  }

  setCharacter(character: Character) {
    this.character = character;
    this.characterService.setCharacterID(this.character.key);
    this.retrieveAttributes();
    this.toggle();
  }

  retrieveAttributes() {
    this.attributeService.getAttributes(this.character.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.attributes = attributes;
    });
  }

  addAttribute() {
    this.updateCharacter();
    const attribute = new Attribute();
    attribute.characterID = this.character.key;
    attribute.userID = firebase.auth().currentUser.uid;
    this.attributeService.createAttribute(attribute);
  }

  async cloneCharacter() {
    this.characterID = this.character.key;
    this.character.userID = firebase.auth().currentUser.uid;
    this.character.key = null;
    this.characterService.createCharacter(this.character);
    await this.delay(500);
    this.cloneAttributes();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  cloneAttributes() {
    this.attributeService.getAttributes(this.characterID).snapshotChanges().pipe(
      takeWhile(() => this.alive), map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.attributes = attributes;
      this.store(this.attributes);
    });
  }

  async store(attributes: any) {
    this.characterID = this.characterService.getCharacterID();
    this.attributeService.cloneAttributes(attributes, this.characterID);
    await this.delay(500);
    this.alive = false;
  }

  close() {
    this.updateCharacter();
    this.toggle();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.messageService.add('close/open details');
    this.characterListComponent.toggle();
  }

  updateCharacter() {
    this.characterService.updateCharacter(this.character);
    for (const attribute of this.attributes) {
      this.attributeService.updateAttribute(attribute);
    }
  }

  deleteCharacter() {
    this.close();
    this.characterService.deleteCharacter(this.character.key);
    for (const attribute of this.attributes) {
      this.attributeService.deleteAttribute(attribute.key);
    }
  }

  addToTracker() {
    this.character.tracked = true;
    for (const attribute of this.attributes) {
      attribute.tracked = true;
    }
    this.updateCharacter();
  }
}
