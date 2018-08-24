import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {

  character: Character = new Character();
  submitted = false;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
  }
  newCharacter(): void {
    this.submitted = false;
    this.character = new Character();
  }

  save() {
    this.characterService.createCharacter(this.character);
    this.character = new Character();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
