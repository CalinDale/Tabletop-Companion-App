import { AttributeService } from './../attribute.service';
import { CharacterService } from './../character.service';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { MessageService } from '../message.service';
import { map } from '../../../node_modules/rxjs/operators';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-character-list-entry',
  templateUrl: './character-list-entry.component.html',
  styleUrls: ['./character-list-entry.component.css']
})
export class CharacterListEntryComponent implements OnInit {

  @Input() character: Character;
  @Input() characterDetails: CharacterDetailsComponent;

  constructor(
    private messageService: MessageService,
    private characterService: CharacterService,
    private attributeService: AttributeService
  ) { }

  ngOnInit() {
  }

  cloneCharacter() {
    this.messageService.add('clone Character ' + this.character.name);
  }

  editCharacter() {
    this.messageService.add('Edit Character ' + this.character.name);
    this.characterDetails.setCharacter(this.character);
  }

  addToTracker() {
    this.characterService.trackCharacter(this.character);
    let charAttributes: Attribute[] = [];
    this.attributeService.getAttributes(this.character.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      charAttributes = attributes;
    });
    for ( const attribute of charAttributes ) {
      this.attributeService.trackAttribute(attribute);
    }
  }

  removeFromTracker() {
    this.characterService.untrackCharacter(this.character);
    let charAttributes: Attribute[] = [];
    this.attributeService.getAttributes(this.character.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      charAttributes = attributes;
    });
    for ( const attribute of charAttributes ) {
      this.attributeService.untrackAttribute(attribute);
    }
  }
}



