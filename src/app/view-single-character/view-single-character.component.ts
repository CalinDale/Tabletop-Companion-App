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

  characters: any = [];
  character: any;
  attributes: any;
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
    this.getAttributes();
  }

  getCharacter() {
    this.characterID = this.characterService.getCharacterID();
    this.characterService.getCharacter(this.characterID).valueChanges()
    .subscribe(characters => {
      this.characters = characters;
      console.log(this.characters);
    });
  }

  getAttributes() {
    this.characterID = this.characterService.getCharacterID();
    this.attributeService.getAttributes(this.characterID).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.attributes = attributes;
    });
  }
}
