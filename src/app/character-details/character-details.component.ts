import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  @Input() character: Character;

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  deleteCharacter() {
    this.characterService.deleteCharacter(this.character.charId);
  }

  updateActive(isActive: boolean) {
    this.characterService.updateCharacter(this.character.charId, { active: isActive });
  }

  addCharacter(): void {
    this.messageService.add('Add New Character');
  }

  reorderCharacters(): void {
    this.messageService.add('Reorder Character');
  }

  removeCharacter(): void {
    this.messageService.add('Remove Character');
  }
}



