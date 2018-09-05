import { CharacterService } from './../character.service';
import { Component, OnInit } from '@angular/core';
import { Attribute } from '../attribute';
import { AttributeService } from '../attribute.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-attribute',
  templateUrl: './edit-attribute.component.html',
  styleUrls: ['./edit-attribute.component.css']
})
export class EditAttributeComponent implements OnInit {

  attribute: Attribute = new Attribute();
  submitted = false;

  constructor(private attributeService: AttributeService,
  private characterService: CharacterService) { }

  ngOnInit() {
  }

  save() {
    this.attribute.characterID = this.characterService.getCharacterID();
    this.attribute.userID = firebase.auth().currentUser.uid;
    this.attributeService.updateAttribute(this.attribute);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
