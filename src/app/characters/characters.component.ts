import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';




import { CharacterService } from '../character.service';
import { Character } from '../character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Character[];

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }
    this.characterService.addCharacter({ name } as Character)
    .subscribe(character => {
      this.characters.push(character);
    });
    
    //debugging
    console.log(this.characters);

    this.messageService.add('Add New Character');
  }

  reorderCharacters(): void {
    this.messageService.add('Reorder Character');
  }

  removeCharacter(): void {
    this.messageService.add('Remove Character');
  }
}
