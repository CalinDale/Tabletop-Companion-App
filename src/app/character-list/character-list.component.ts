import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { map } from 'rxjs/operators';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { Character } from '../character';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Character[];

  @HostBinding('class.is-open')
  isOpen = true;

  @Input() characterDetails: CharacterDetailsComponent;

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCharactersList();
  }


  getCharactersList() {
    this.characterService.getCharactersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(characters => {
      this.characters = characters;
    });
    // }
  }

  deleteCharacters() {
    this.characterService.deleteAll();
  }

  newCharacter() {
    this.messageService.add('Add new character');
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.messageService.add('close/open character list');
  }
}
