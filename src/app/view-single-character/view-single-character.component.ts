import { AttributeService } from './../attribute.service';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-view-single-character',
  templateUrl: './view-single-character.component.html',
  styleUrls: ['./view-single-character.component.css']
})
export class ViewSingleCharacterComponent implements OnInit {

  characters: any;
  character: any;
  characterID: string;
  constructor(
    // TODO: Delete this section when implementing proper routing.
    private characterService: CharacterService,
    // TODO: End of delete.
    private messageService: MessageService,
    private attributeService: AttributeService,
  ) { }

  ngOnInit() {
    this.getCharacter();
  }

  getCharacter() {
    this.characterID = this.attributeService.getCharacterID();
    console.log(this.characterID);
    this.characters.subscribe( characters => {
      this.character = characters[this.characterID];
      console.log(this.character);
    });

  }

  deleteCharacters() {
    this.characterService.deleteAll();
  }
}
