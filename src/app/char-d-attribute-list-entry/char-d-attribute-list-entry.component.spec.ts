import { CharacterDetailsComponent } from './../character-details/character-details.component';
import { MessageService } from '../message.service';
import { Attribute } from '../attribute';
import { Character } from '../character';

import { CharDAttributeListEntryComponent } from './char-d-attribute-list-entry.component';
import { AttributeService } from '../attribute.service';

describe('CharDAttributeListEntryComponent', () => {
  let testCharacter: Character;
  let testAttribute: Attribute;

  let testCharacterDetailsComponent: CharacterDetailsComponent;

  let testMessageService: MessageService;
  let testAttributeService: AttributeService;

  let component: CharDAttributeListEntryComponent;

  beforeEach(() => {
    testCharacter = {
      key: '23',
      name: 'Grog',
      userID: 'Dave'
    };

    testAttribute = {
      key: '14',
      name: 'Armor',
      type: 'Number',
      value: '20',
      userID: testCharacter.userID,
      characterID: testCharacter.key
    };

    testCharacterDetailsComponent = jasmine.createSpyObj('testCharacterDetailsComponent', [
      'updateCharacter'
    ]);
    testMessageService = jasmine.createSpyObj('testMessageService', [
      'add'
    ]);
    testAttributeService = jasmine.createSpyObj('testAttributeService', [
      'deleteAttribute',
      'updateAttribute'
    ]);

    component = new CharDAttributeListEntryComponent(
      testMessageService,
      testAttributeService);
  });
  afterEach(() => {
    testCharacter = null;
    testAttribute = null;
    testCharacterDetailsComponent = null;
    testMessageService = null;
    testAttributeService = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('With valid Attribute', () => {
    beforeEach(() => {
      component.attribute = testAttribute;
    });
    afterEach(() => {
      component.attribute = null;
    });
    describe('With valid characterDetailsComponent', () => {
      beforeEach(() => {
        component.characterDetailsComponent = testCharacterDetailsComponent;
      });
      afterEach(() => {
        component.characterDetailsComponent = null;
      });
      describe('delete()', () => {
        it('should call attributeService.deleteAttribute() with attribute key', () => {
          component.delete();
          expect(testAttributeService.deleteAttribute).toHaveBeenCalledWith(testAttribute.key);
        });
      });
    });
  });
});
