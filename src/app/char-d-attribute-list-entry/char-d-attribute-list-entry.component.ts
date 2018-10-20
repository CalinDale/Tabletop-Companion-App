import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MessageService } from '../message.service';
import { AttributeService } from '../attribute.service';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-char-d-attribute-list-entry',
  templateUrl: './char-d-attribute-list-entry.component.html',
  styleUrls: ['./char-d-attribute-list-entry.component.css']
})
export class CharDAttributeListEntryComponent implements OnInit {

  @Input() attribute: Attribute;
  @Input() characterDetailsComponent: CharacterDetailsComponent;

  constructor(
    private messageService: MessageService,
    private attributeService: AttributeService
  ) { }

  ngOnInit() {
  }

  // updateAttribute() {
  //   this.attributeService.updateAttribute(this.attribute);
  // }

  delete() {
    this.characterDetailsComponent.updateCharacter();
    this.attributeService.deleteAttribute(this.attribute.key);
  }
}
