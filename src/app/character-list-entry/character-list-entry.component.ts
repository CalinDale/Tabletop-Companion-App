import { CharacterService } from './../character.service';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-character-list-entry',
  templateUrl: './character-list-entry.component.html',
  styleUrls: ['./character-list-entry.component.css']
})
export class CharacterListEntryComponent implements OnInit {

  @Input() character: Character;
  @Input() characterDetails: CharacterDetailsComponent;

  constructor(
    private messageService: MessageService,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
  }

  cloneCharacter() {
    this.messageService.add('clone Character ' + this.character.name);
  }

  editCharacter() {
    this.messageService.add('Edit Character ' + this.character.name);
    this.characterDetails.setCharacter(this.character);
  }

  addToTracker() {
    this.character.tracked = true;
    this.characterService.setCharacterID(this.character.key);
    this.characterService.updateCharacter(this.character);
  }

  removeFromTracker() {
    this.character.tracked = false;
    this.characterService.setCharacterID(this.character.key);
    this.characterService.updateCharacter(this.character);
  }
}



