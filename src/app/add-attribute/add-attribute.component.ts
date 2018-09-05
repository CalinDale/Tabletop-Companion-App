import { CharacterService } from './../character.service';
import { CharacterDetailsComponent } from './../character-details/character-details.component';
import { AttributeService } from './../attribute.service';
import { Component, OnInit } from '@angular/core';
import { Attribute } from '../attribute';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.css']
})
export class AddAttributeComponent implements OnInit {

  attribute: Attribute = new Attribute();
  submitted = false;

  constructor(private attributeService: AttributeService,
  private characterService: CharacterService) { }

  ngOnInit() {
  }

  newAttribute(): void {
    this.submitted = false;
    this.attribute = new Attribute();
  }

  save() {
    this.attribute.characterID = this.characterService.getCharacterID();
    this.attribute.userID = firebase.auth().currentUser.uid;
    this.attributeService.createAttribute(this.attribute);
    this.attribute = new Attribute();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
