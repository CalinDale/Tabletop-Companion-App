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
import { Attribute } from '../../../node_modules/@angular/core';

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
  let testCharacterID: string;
  let testAttributeService: AttributeService;
  let component: AddAttributeComponent;

  beforeEach(async(() => {
    testCharacterID = 'Grog34';
    testAttributeService = jasmine.createSpyObj('testAttributeService', [
      'getCharacterID',
      'createAttribute'
    ]);
    (<jasmine.Spy>(testAttributeService.getCharacterID)).and.returnValue(testCharacterID);

    component = new AddAttributeComponent(testAttributeService);

    TestBed.configureTestingModule({
      declarations: [ AddAttributeComponent ],
      imports: [
        FormsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
        // AngularFireDatabaseModule // for database
      ],
      providers: [
        { provide: AngularFireDatabase },
      ]
    })
    .compileComponents();
  }));
  afterEach(() => {
    testCharacterID = null;
    testAttributeService = null;
    component = null;
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

  // TODO: Work out how to mock the firebase import.
  // it('save() should set attribute.characterID to attributeService.characterID', () => {
  //   component.save();
  //   firebase.initializeApp();
  //   expect(component.attribute.characterID).toBe(testCharacterID);
  // });
});
