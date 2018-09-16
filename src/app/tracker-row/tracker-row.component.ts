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

  attributes: Attribute[];

  constructor(
    private attributeService: AttributeService
  ) { }

  ngOnInit() {
    this.retrieveAttributes();
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
}
