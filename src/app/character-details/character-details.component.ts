import { Attribute } from '../attribute';
import { CharacterListComponent } from '../character-list/character-list.component';
import { MessageService } from '../message.service';
import { CharacterService } from '../character.service';
import { AttributeService } from '../attribute.service';
import { Character } from '../character';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

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

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService,
    private messageService: MessageService,
  ) { }

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
}
