import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { AttributeService } from '../attribute.service';
import { Router } from '@angular/router';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-char-d-attribute-list-entry',
  templateUrl: './char-d-attribute-list-entry.component.html',
  styleUrls: ['./char-d-attribute-list-entry.component.css']
})
export class CharDAttributeListEntryComponent implements OnInit {

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

  delete() {
    this.attributeService.deleteAttribute(this.attribute.key);
  }

  editAttribute() {
    this.attributeService.setAttributeID(this.attribute.key);
    this.router.navigateByUrl('editattribute');
  }

  editCharacter() {
    this.router.navigateByUrl('editcharacter');
  }

}

