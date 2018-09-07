import { MessageService } from '../message.service';
import { CharacterService } from '../character.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleCharacterComponent } from './view-single-character.component';
import { AttributeService } from '../attribute.service';

describe('ViewSingleCharacterComponent', () => {
  let component: ViewSingleCharacterComponent;
  let testCharacterService: CharacterService;
  let testMessageService: MessageService;
  let testArrtibuteService: AttributeService;

  beforeEach(() => {
    component = new ViewSingleCharacterComponent(testCharacterService, testMessageService, testArrtibuteService);
  });
  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
