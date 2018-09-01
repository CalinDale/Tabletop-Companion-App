import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { AttributeService } from '../attribute.service';
import { Router } from '@angular/router';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-single-character-details',
  templateUrl: './single-character-details.component.html',
  styleUrls: ['./single-character-details.component.css']
})
export class SingleCharacterDetailsComponent implements OnInit {

  @Input() character: Character;
  @Input() attribute: Attribute;

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService,
    private attributeService: AttributeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createAttribute( ) {
    this.attributeService.setCharacterID(this.character.key);
    this.router.navigateByUrl('addattribute');
  }

  deleteCharacter() {
    this.characterService.deleteCharacter(this.character.key);
  }

  updateActive(isActive: boolean) {
    this.characterService.updateCharacter(this.character.key, { active: isActive });
  }

  addCharacter(): void {
    this.messageService.add('Add New Character');
  }

  reorderCharacters(): void {
    this.messageService.add('Reorder Character');
  }


}

