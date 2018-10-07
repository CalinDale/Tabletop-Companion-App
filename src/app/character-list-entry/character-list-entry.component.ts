import { AttributeService } from './../attribute.service';
import { CharacterService } from './../character.service';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { MessageService } from '../message.service';
import { map, takeWhile } from '../../../node_modules/rxjs/operators';
import { Attribute } from '../attribute';
import { TrackerService } from '../tracker.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-character-list-entry',
  templateUrl: './character-list-entry.component.html',
  styleUrls: ['./character-list-entry.component.css']
})
export class CharacterListEntryComponent implements OnInit {

  @Input() character: Character;
  @Input() characterDetails: CharacterDetailsComponent;

  alive: boolean;

  constructor(
    private messageService: MessageService,
    private trackerService: TrackerService,
    private characterService: CharacterService,
    private attributeService: AttributeService
  ) {
    this.alive = true;
  }

  ngOnInit() {
  }

  // Try without async with below changes
  async cloneCharacter() {
    this.messageService.add('clone Character ' + this.character.name);
    const characterClone = new Character;
    characterClone.name = this.character.name + '-Clone';
    characterClone.userID = firebase.auth().currentUser.uid;
    this.characterService.createCharacter(characterClone);
    // Try without await with cloneAttributes in AttributeService
    await this.delay(500);
    // Try moving cloneAttributes to AttributeService
    this.cloneAttributes();
  }

  delay(ms: number) {
    return new Promise ( resolve => setTimeout(resolve, ms));
  }

  cloneAttributes() {
    let sourceAttributes: Attribute[];
    this.attributeService.getAttributes(this.character.key).snapshotChanges().pipe(
      takeWhile(() => this.alive), map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      sourceAttributes = attributes;
      this.store(sourceAttributes);
    });
  }

  async store(attributes: Attribute[]) {
    const clonedCharacterID = this.characterService.getCharacterID();
    this.attributeService.cloneAttributes(attributes, clonedCharacterID);
    await this.delay(500);
    this.alive = false;
  }

  editCharacter() {
    this.messageService.add('Edit Character ' + this.character.name);
    this.characterDetails.setCharacter(this.character);
  }

  addToTracker() {
    this.trackerService.addToTracker(this.character);
    // setTracker( this.trackerId, this.characterId )
  }

  removeFromTracker() {
    this.trackerService.removeFromTracker(this.character);
  }
}



