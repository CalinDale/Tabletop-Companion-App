import { Component, OnInit, Input } from '@angular/core';

import { CharacterService } from './../character.service';
import { Character } from './../character';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css']
})
export class CharacterPageComponent implements OnInit {
  @Input() character: Character;

  constructor(
    // TODO: Delete this section when implementing proper routing.
    private characterService: CharacterService
    // TODO: End of delete.
  ) { }

  ngOnInit() {
    // TODO: Delete this section when implementing proper routing.
    this.getCharacterTEMP();
    // TODO: End of delete.
  }

  // gets the character by the ID in the route.
  getCharacter(): void {}

  // go to previous page
  goBack(): void {}

  // save changes to character
  save(): void {}

  addAttribute(): void {}

  removeAttribute(): void {}

  // TODO: Delete this section when implementing proper routing.
  getCharacterTEMP(): void {
    this.characterService.getCharacters().subscribe(characters => this.character = characters[2]);
  }
  // TODO: End of delete.
}
