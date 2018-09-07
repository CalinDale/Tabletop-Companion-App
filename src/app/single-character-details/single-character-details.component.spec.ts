import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { CharacterService } from '../character.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCharacterDetailsComponent } from './single-character-details.component';
import { AttributeService } from '../attribute.service';

describe('SingleCharacterDetailsComponent', () => {
  let testCharacterService: CharacterService;
  let testMessageService: MessageService;
  let testAttributeService: AttributeService;
  let testRouter: Router;
  let component: SingleCharacterDetailsComponent;

  beforeEach(() => {
    component = new SingleCharacterDetailsComponent(testCharacterService, testMessageService, testAttributeService, testRouter);
  });
  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
