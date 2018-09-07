import { CharacterDetailsComponent } from './../character-details/character-details.component';
import { AddAttributeComponent } from '../add-attribute/add-attribute.component';
import { AttributeService } from '../attribute.service';
import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-character-list-entry',
  templateUrl: './character-list-entry.component.html',
  styleUrls: ['./character-list-entry.component.css']
})
export class CharacterListEntryComponent implements OnInit {

  @Input() character: Character;
  @Input() characterDetails: CharacterDetailsComponent;

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService,
    private attributeService: AttributeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  cloneCharacter() {
    this.messageService.add('clone Character ' + this.character.name);
  }

  editCharacter() {
    this.messageService.add('Edit Character ' + this.character.name);
    this.attributeService.setCharacterID(this.character.key);
    this.characterDetails.setCharacter(this.character);
  }

  /*
  createAttribute( ) {
    this.attributeService.setCharacterID(this.character.key);
    this.router.navigateByUrl('addattribute');
  }

  deleteCharacter() {
    this.characterService.deleteCharacter(this.character.key);
  }

  editCharacter() {
    this.attributeService.setCharacterID(this.character.key);
    // this.router.navigateByUrl('getCharacter');
  }

  addCharacter(): void {
    this.messageService.add('Add New Character');
  }

  reorderCharacters(): void {
    this.messageService.add('Reorder Character');
  }

  setCharacterID( ) {
    this.attributeService.setCharacterID(this.character.key);
    this.router.navigateByUrl('getCharacter');
  }

  */
}



