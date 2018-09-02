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
    this.router.navigateByUrl('addattribute');
  }

  removeAttribute() {
    this.attributeService.deleteAttribute(this.attribute.key);
  }

  updateActive(isActive: boolean) {
    this.characterService.updateCharacter(this.character.key, { active: isActive });
  }

  editAttribute() {
    this.attributeService.setAttributeID(this.attribute.key);
    this.router.navigateByUrl('editattribute');
  }


}

