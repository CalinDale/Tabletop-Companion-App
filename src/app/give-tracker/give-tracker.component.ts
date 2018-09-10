import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { AttributeService } from '../attribute.service';
import { MessageService } from '../message.service';
import { map } from 'rxjs/operators';
import { Character } from '../character';

@Component({
  selector: 'app-give-tracker',
  templateUrl: './give-tracker.component.html',
  styleUrls: ['./give-tracker.component.css']
})
export class GiveTrackerComponent implements OnInit {

  characterID: any;
  characters: any;
  attributes: any;
  character: Character = new Character();

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.characterService.getCharactersTracker().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(characters => {
      this.characters = characters;
    });
  }

}

