import { Component, OnInit, Input } from '@angular/core';

import { CharacterService } from './../character.service';
import { Character } from './../character';
import { MessageService } from '../message.service';

import { ActivatedRoute } from '../../../node_modules/@angular/router';
import {Location} from '@angular/common';



@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css']
})
export class CharacterPageComponent implements OnInit {
  
  @Input() character: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCharacter();
  }

  // gets the character by the ID in the route.
  getCharacter(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    this.characterService.getCharacterById(id)
    .subscribe(character => this.character = character);
  }

  // go to previous page
  goBack(): void {
    this.location.back();
    this.messageService.add('Back to last Page');
  }

  // save changes to character
  save(): void {
    this.messageService.add('Save changes');
  }

  addAttribute(): void {
    this.messageService.add('Add new attribute');
  }

  editAttribute(): void {
    this.messageService.add('Edit attribute');
  }

  removeAttribute(): void {
    this.messageService.add('Remove Attribute');
  }

  reorderAttribute(): void {
    this.messageService.add('Reorder Attribute');
  }

  rename(): void {
    this.messageService.add('rename');
  }

  // TODO: Delete this section when implementing proper routing.
  getCharacterTEMP(): void {
    this.characterService.getCharacters().subscribe(characters => this.character = characters[2]);
  }
  // TODO: End of delete.
}
