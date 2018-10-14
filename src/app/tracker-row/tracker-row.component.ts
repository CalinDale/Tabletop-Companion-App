import { TrackerService } from '../tracker.service';
import { AttributeService } from '../attribute.service';
import { Character } from '../character';
import { Attribute } from '../attribute';
import { Component, OnInit, Input} from '@angular/core';
import { map, takeWhile } from '../../../node_modules/rxjs/operators';

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

  // TODO: get characters from service instead of tracker component.
  // Need to master having observables continually stream new updates for this.
  // then can have order changing functions update tracker service which will cause tracker to update.
  // I think we'll need to master that for anything here.
  @Input()characters: Character[];

  attributes: Attribute[] = [];
  selectedAttributeIndexes: number[] = [];
  unlinked: boolean;

  constructor(
    private attributeService: AttributeService,
    private trackerService: TrackerService
  ) { }

  ngOnInit() {
    this.retrieveAttributes();
    this.unlinked = false;

    this.trackerService.getAttributeColumns().subscribe(attributeColumns => {
      this.attributeColumns = attributeColumns;
    });

    // See Above
    // this.retrieveCharacters();
    // TODO: This function is for setting the displayed attributes up, but doesn't work currently
    // TODO: because it will try to run before it gets the attributes from the observable.
    // this.prepareAttributeColumns();
  }

  hasAttributes() {

  }

  prepareAttributeColumns() {
    for (let columnIndex = 0 ; columnIndex <= this.attributeColumns.length; columnIndex++ ) {
      for (const attribute of this.attributes ) {
        if (attribute.displayColumn === columnIndex) {
          this.selectedAttributeIndexes[columnIndex] = this.attributes.indexOf(attribute);
        }
      }
    }
  }

  onChange(i: number) {
    if (this.unlinked === true) {
     this.attributes = this.attributes;
    } else if ( this.unlinked === false ) {
    this.attributeService.updateAttribute(this.attributes[this.selectedAttributeIndexes[i]]);
    }
  }

  saveAllAttributes() {
    if (this.unlinked !== true) {
      for ( const attriubte of this.attributes ) {
        this.attributeService.updateAttribute(attriubte);
      }
    }
  }

  onSelect(columnIndex: number) {
    for (const attribute of this.attributes ) {
      if (attribute.displayColumn === columnIndex) {
        attribute.displayColumn = null;
      }
    }
    this.attributes[this.selectedAttributeIndexes[columnIndex]].displayColumn = columnIndex;
    this.saveAllAttributes();
  }

  isActing(): boolean {
    return this.index === this.currentActor;
  }

  retrieveAttributes() {
    this.trackerService.getAttributes(this.character.key).subscribe(attributes => {
      this.attributes = attributes;
    });
  }

  retrieveCharacters() {
    this.trackerService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  // TODO: Made change, do manual test
  moveUp() {
    if (this.index > 0) {
      const tmp = this.characters[this.index - 1];
      this.characters[this.index - 1] = this.characters[this.index];
      this.characters[this.index] = tmp;
    } else {
      // Do we need to have the character rotate back down if you try moving them up while they're at the top?
      // we could just turn off the button.
      const tmp = this.characters[this.characters.length - 1];
      this.characters[this.characters.length - 1] = this.character;
      this.characters[0] = tmp;
    }
  }

  // TODO: Made change, do manual test
  moveDown() {
    if (this.index < this.characters.length - 1) {
      const tmp = this.characters[this.index + 1];
      this.characters[this.index + 1] = this.characters[this.index];
      this.characters[this.index] = tmp;
    } else {
      // Same as above.
      const tmp = this.characters[0];
      this.characters[0] = this.character;
      this.characters[this.characters.length - 1] = tmp;
    }
  }

  linkButton() {
    if (this.unlinked) {
      this.link();
    } else {
      this.unlink();
    }
  }

  unlink() {
    this.unlinked = true;
  }

  link() {
    this.unlinked = false;
    for ( let j = 0; j <= this.selectedAttributeIndexes.length; j++ ) {
      this.onChange(this.selectedAttributeIndexes[j]);
    }
  }
}
