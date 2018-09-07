import { Attribute } from './../attribute';
import { MessageService } from './../message.service';
import { CharacterService } from './../character.service';
import { AttributeService } from '../attribute.service';
import { Character } from './../character';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  character: Character;

  attributes: Attribute[];
  characterID: string;

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.retrieveAttributes();
  }

  setCharacter(character: Character) {
    this.character = character;
    this.characterID = character.key;
    this.retrieveAttributes();
  }

  retrieveAttributes() {
    this.attributeService.getAttributes(this.characterID).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.attributes = attributes;
    });
  }

}
