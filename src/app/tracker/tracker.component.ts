import { AttributeService } from './../attribute.service';
import { CharacterService } from './../character.service';
import { Character } from './../character';
import { Component, OnInit } from '@angular/core';
import { map } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  characters: Character[];

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
