import { AttributeService } from './../attribute.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeComponent } from './add-attribute.component';
import { FormsModule } from '../../../node_modules/@angular/forms';

import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from '../../../node_modules/rxjs';

import { AngularFireDatabase} from 'angularfire2/database';
import { Attribute } from '../attribute';
import * as firebase from 'firebase';

describe('AddAttributeComponent', () => {
//  let component: AddAttributeComponent;
//  let fixture: ComponentFixture<AddAttributeComponent>;
//
//  const FireDatabaseStub = {
//    collection: (name: string) => ({
//      doc: (_id: string) => ({
//        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
//        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
//      })
//    })
//  };
//
//  beforeEach(async(() => {
//    TestBed.configureTestingModule({
//      declarations: [ AddAttributeComponent ],
//      imports: [
//        FormsModule,
//        AngularFireAuthModule,
//        AngularFireModule.initializeApp(environment.firebase),
//        // AngularFireDatabaseModule // for database
//      ],
//      providers: [
//        { provide: AngularFireDatabase, useValue: FireDatabaseStub}
//      ]
//    })
//    .compileComponents();
//  }));
//
//  beforeEach(() => {
//    fixture = TestBed.createComponent(AddAttributeComponent);
//    component = fixture.componentInstance;
//    fixture.detectChanges();
//  });
//
//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });
});

describe('AddAttributeComponent2', () => {
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

    TestBed.configureTestingModule({
      declarations: [ AddAttributeComponent ],
      imports: [
        FormsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
        // AngularFireDatabaseModule // for database
      ],
      providers: [
        // { provide: firebase.auth, useValue: testAuthFunction },
      ]
    })
    .compileComponents();
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
