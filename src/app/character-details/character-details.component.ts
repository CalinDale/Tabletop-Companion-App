import { Attribute } from './../attribute';
import { CharacterListComponent } from '../character-list/character-list.component';
import { MessageService } from '../message.service';
import { CharacterService } from '../character.service';
import { AttributeService } from '../attribute.service';
import { Character } from '../character';
import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

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

  @HostListener('focusout', ['$event.target'])
    onFocusout(target) {
      console.log('Focus out called');
      target.type = 'text';
    }

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.retrieveAttributes();
  }

  setCharacter(character: Character) {
    this.character = character;
    this.characterID = character.key;
    this.retrieveAttributes();
    this.toggle();
  }

  retrieveAttributes() {
    this.attributeService.getAttributes(this.characterID).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.attributes = attributes;
    });
  }

  addAttribute() {
    const attribute = new Attribute();
    attribute.characterID = this.attributeService.getCharacterID();
    attribute.userID = firebase.auth().currentUser.uid;
    this.attributeService.createAttribute(attribute);
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.messageService.add('close/open details');
    this.characterListComponent.toggle();
  }

  updateCharacter() {
    this.character.key = this.attributeService.getCharacterID();
    this.character.userID = firebase.auth().currentUser.uid;
    this.characterService.updateCharacter(this.character);
  }
}
