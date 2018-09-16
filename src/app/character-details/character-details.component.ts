import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { AttributeService } from './../attribute.service';
import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  @Input() character: Character;

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  createAttribute( ) {
    this.characterService.setCharacterID(this.character.key);
    this.router.navigateByUrl('addattribute');
  }

  addToTracker() {
    this.characterService.setCharacterID(this.character.key);
    this.character.userID = firebase.auth().currentUser.uid;
    this.character.tracked = true;
    this.characterService.updateCharacter(this.character);
    this.router.navigateByUrl('viewtracker');
  }

  cloneCharacter() {
    this.character.userID = firebase.auth().currentUser.uid;
    this.character.key = null;
    this.characterService.createCharacter(this.character);
  }

  deleteCharacter() {
    this.characterService.deleteCharacter(this.character.key);
  }

  editCharacter() {
    this.characterService.setCharacterID(this.character.key);
    this.router.navigateByUrl('editcharacter');
  }

  addCharacter(): void {
    this.messageService.add('Add New Character');
  }

  reorderCharacters(): void {
    this.messageService.add('Reorder Character');
  }

  setCharacterID( ) {
    this.characterService.setCharacterID(this.character.key);
    this.router.navigateByUrl('getCharacter');
  }


}



