import { AttributeService } from './../attribute.service';
import { Character } from './../character';
import { Attribute } from './../attribute';
import { Component, OnInit, Input} from '@angular/core';
import { map } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-tracker-row',
  templateUrl: './tracker-row.component.html',
  styleUrls: ['./tracker-row.component.css']
})
export class TrackerRowComponent implements OnInit {

  @Input()character: Character;
  @Input()attributeColumns: Attribute[];
  @Input()currentActor: number;
  @Input()index: number;
  @Input()characters: Character[];

  attributes: Attribute[];
  editingAttributes: Attribute[] = [ ];
  selectedAttributeIndexes: number[] = [];

  constructor(
    private attributeService: AttributeService
  ) { }

  ngOnInit() {
    this.retrieveAttributes();
  }

  onChange(i: number) {
    this.attributeService.updateAttribute(this.attributes[this.selectedAttributeIndexes[i]]);
  }

  isActing(): boolean {
    return this.index === this.currentActor;
  }

  retrieveAttributes() {
    this.attributeService.getAttributes(this.character.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(attributes => {
      this.attributes = attributes;
    });
  }

  moveUp() {
    if (this.index > 0) {
      const tmp = this.characters[this.index - 1];
      this.characters[this.index - 1] = this.characters[this.index];
      this.characters[this.index] = tmp;
    } else {
      const tmp = this.characters[this.characters.length - 1];
      this.characters[0] = tmp;
      this.characters[this.characters.length - 1] = this.character;
    }
  }

  moveDown() {
    if (this.index < this.characters.length - 1) {
      const tmp = this.characters[this.index + 1];
      this.characters[this.index + 1] = this.characters[this.index];
      this.characters[this.index] = tmp;
    } else {
      const tmp = this.characters[0];
      this.characters[this.characters.length - 1] = tmp;
      this.characters[0] = this.character;
    }
  }
}
