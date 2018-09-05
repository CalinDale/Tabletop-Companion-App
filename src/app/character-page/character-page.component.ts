import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { CharacterService } from './../character.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css']
})
export class CharacterPageComponent implements OnInit {
  characters: any;

  constructor(
    // TODO: Delete this section when implementing proper routing.
    private characterService: CharacterService,
    // TODO: End of delete.
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
  }

  deleteCharacters() {
    this.characterService.deleteAll();
  }


}
