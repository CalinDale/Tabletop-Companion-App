import { Component } from '@angular/core';

// Remove when done testing characters
import { CharacterService } from './character.service';
import { Character } from './character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tabletop-Companion-App';

  // Remove when done testing characters
  characters: Character[];

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters()
    .subscribe(characters => this.characters = characters);
  }
  // end of remove when done testing characters
}
