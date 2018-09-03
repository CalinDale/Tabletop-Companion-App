import { AttributeService } from './../attribute.service';
import { Character } from './../character';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.css']
})
export class EditCharacterComponent implements OnInit {

  character: Character = new Character();
  submitted = false;

  constructor(private characterService: CharacterService,
  private attributeService: AttributeService) { }

  ngOnInit() {
  }

  save() {
    this.character.key = this.attributeService.getCharacterID();
    this.character.userID = firebase.auth().currentUser.uid;
    this.characterService.updateCharacter(this.character);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
