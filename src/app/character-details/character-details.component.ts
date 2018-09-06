import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { AttributeService } from './../attribute.service';
import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { Attribute } from '../attribute';


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
    private attributeService: AttributeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createAttribute( ) {
    this.attributeService.setCharacterID(this.character.key);
    this.router.navigateByUrl('addattribute');
  }

  deleteCharacter() {
    this.characterService.deleteCharacter(this.character.key);
  }

  editCharacter() {
    this.attributeService.setCharacterID(this.character.key);
    this.router.navigateByUrl('editcharacter');
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

  cloneCharacter() {
    this.messageService.add('clone Character ' + this.character.name);
  }
}



