import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { AttributeService } from './../attribute.service';
import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  @Input() character: Character;

  characterID: string;
  attributes: any;
  attribute: any;
  alive: boolean;

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService,
    private messageService: MessageService,
    private router: Router,
  ) {this.alive = true; }

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



