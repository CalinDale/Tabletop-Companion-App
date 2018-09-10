import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Character } from '../character';
import { MessageService } from '../message.service';
import { AttributeService } from '../attribute.service';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-char-d-attribute-list-entry',
  templateUrl: './char-d-attribute-list-entry.component.html',
  styleUrls: ['./char-d-attribute-list-entry.component.css']
})
export class CharDAttributeListEntryComponent implements OnInit {

  @Input() character: Character;
  @Input() attribute: Attribute;

  @HostListener('focusout', ['$event.target'])
    onFocusout(target) {
      console.log('Focus out called');
      // TODO: Investigate the line below to fix the double-click on next field error.
      target.type = 'text';
    }

  constructor(
    private messageService: MessageService,
    private attributeService: AttributeService
  ) { }

  ngOnInit() {
  }

  delete() {
    this.attributeService.deleteAttribute(this.attribute.key);
  }

  updateAttribute() {
    this.attributeService.updateAttribute(this.attribute);
    this.messageService.add('Changes to ' + this.attribute.name + ' saved');
  }
}

