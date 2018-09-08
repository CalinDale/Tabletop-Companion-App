import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { CharacterService } from '../character.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharDAttributeListEntryComponent } from './char-d-attribute-list-entry.component';
import { AttributeService } from '../attribute.service';

describe('SingleCharacterDetailsComponent', () => {
  let testCharacterService: CharacterService;
  let testMessageService: MessageService;
  let testAttributeService: AttributeService;
  let testRouter: Router;
  let component: CharDAttributeListEntryComponent;

  beforeEach(() => {
    component = new CharDAttributeListEntryComponent(testCharacterService, testMessageService, testAttributeService, testRouter);
  });
  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
