import { MessageService } from '../message.service';
import { Attribute } from '../attribute';
import { Character } from '../character';

import { CharDAttributeListEntryComponent } from './char-d-attribute-list-entry.component';
import { AttributeService } from '../attribute.service';

describe('SingleCharacterDetailsComponent', () => {
  let testCharacter: Character;
  let testAttribute: Attribute;

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
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('With valid Character', () => {
    beforeEach(() => {
      component.character = testCharacter;
    });
    afterEach(() => {
      component.character = null;
    });
    describe('With valid Attribute', () => {
      beforeEach(() => {
        component.attribute = testAttribute;
      });
      afterEach(() => {
        component.attribute = null;
      });
      it('delete() should call attributeService.deleteAttribute() with attribute key', () => {
        component.delete();
        expect(testAttributeService.deleteAttribute).toHaveBeenCalledWith(testAttribute.key);
      });
      it('update() should call attributeService.updateAttribute() with attribute', () => {
        component.updateAttribute();
        expect(testAttributeService.updateAttribute).toHaveBeenCalledWith(testAttribute);
      });
    });
  });
});
