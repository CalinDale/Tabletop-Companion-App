import { AttributeService } from './../attribute.service';
import { async } from '@angular/core/testing';

import { AddAttributeComponent } from './add-attribute.component';

import { Attribute } from '../attribute';
import * as firebase from 'firebase';

describe('AddAttributeComponent', () => {
  let testUserID: string;
  let testCharacterID: string;
  let testAttributeService: AttributeService;
  let component: AddAttributeComponent;

  let testAuthFunction: Function;

  beforeEach(async(() => {
    testUserID = 'Dave32';
    testCharacterID = 'Grog34';
    testAttributeService = jasmine.createSpyObj('testAttributeService', [
      'getCharacterID',
      'createAttribute'
    ]);
    (<jasmine.Spy>(testAttributeService.getCharacterID)).and.returnValue(testCharacterID);

    component = new AddAttributeComponent(testAttributeService);

    testAuthFunction = firebase.auth;
    spyOn(firebase, 'auth').and.returnValue( { currentUser: { uid: testUserID } } );

  }));
  afterEach(() => {
    testUserID = null;
    testCharacterID = null;
    testAttributeService = null;
    component = null;
    testAuthFunction = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('newAttribute() should set submitted to false', () => {
    component.submitted = true;
    component.newAttribute();
    expect(component.submitted).toBeFalsy();
  });

  it('newAttribute() should set attribute to a new Attribute', () => {
    component.newAttribute();
    expect(component.attribute).toBeDefined();
    expect(component.attribute.characterID).toBeUndefined();
    expect(component.attribute.userID).toBeUndefined();
    expect(component.attribute.name).toBeUndefined();
    expect(component.attribute.type).toBeUndefined();
    expect(component.attribute.value).toBeUndefined();
  });

  it('save() should get attribute.characterID from attributeService.characterID', () => {
    component.save();
    expect(testAttributeService.getCharacterID).toHaveBeenCalled();
  });

  // TODO: Can't do this test properly while attribute hasn't got getters or setters
  // it('save() should set attribute.characterID to attributeService.characterID', () => {
  //   component.attribute.characterID = '';
  //   const testAttribute = component.attribute;
  //   const spyAttributeCharacterID = spyOnProperty(testAttribute, 'characterID');
  //   component.save();
  //   expect(spyAttributeCharacterID).toHaveBeenCalledWith(testCharacterID);
  // });

  it('save() should get attribute.userID from firebase.auth().currentUser.uid', () => {
    component.save();
    expect(firebase.auth).toHaveBeenCalled();
  });

  // TODO: Can't do this test properly while attribute hasn't got getters or setters
  // it('save() should set attribute.userID to firebase.auth().currentUser.uid', () => {});

  describe('with characterID and userID inserted into attribute', () => {
    let testAttribute: Attribute;
    beforeEach(() => {
      testAttribute = new Attribute();
      testAttribute.characterID = testCharacterID;
      testAttribute.userID = testUserID;
    });
    afterEach(() => {
      testAttribute = null;
    });
    it('save() should send attribute to attributeService.createAttribute()', () => {
      component.save();
      expect(testAttributeService.createAttribute).toHaveBeenCalledWith(testAttribute);
    });
  });

  it('save() should reinitialize attribute', () => {
    component.save();
    expect(component.attribute).toBeDefined();
    expect(component.attribute.characterID).toBeUndefined();
    expect(component.attribute.userID).toBeUndefined();
  });

  it('onSubmit() should set submitted as true;', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('onSubmit() should call save()', () => {
    spyOn(component, 'save');
    component.onSubmit();
    expect(component.save).toHaveBeenCalled();
  });
});
