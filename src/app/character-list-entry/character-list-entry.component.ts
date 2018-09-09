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
    private messageService: MessageService
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
}



