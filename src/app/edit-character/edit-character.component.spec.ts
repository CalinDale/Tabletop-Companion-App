import { AttributeService } from '../attribute.service';
import { CharacterService } from '../character.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharacterComponent } from './edit-character.component';

describe('EditCharacterComponent', () => {
  let testCharacterService: CharacterService;
  let testAttributeService: AttributeService;
  let component: EditCharacterComponent;

  beforeEach(() => {
    component = new EditCharacterComponent(testCharacterService, testAttributeService);
  });

  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
