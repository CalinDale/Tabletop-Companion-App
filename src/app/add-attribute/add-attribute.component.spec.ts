import { AttributeService } from './../attribute.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeComponent } from './add-attribute.component';
import { FormsModule } from '../../../node_modules/@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from '../../../node_modules/rxjs';

import { AngularFireDatabase} from 'angularfire2/database';
import { Attribute } from '../../../node_modules/@angular/core';

describe('AddAttributeComponent', () => {
  let component: AddAttributeComponent;
  let fixture: ComponentFixture<AddAttributeComponent>;

  const FireDatabaseStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      })
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttributeComponent ],
      imports: [
        FormsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        // AngularFireDatabaseModule // for database
      ],
      providers: [
        { provide: AngularFireDatabase, useValue: FireDatabaseStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prepare new Attribute', () => {
    component.newAttribute();
    expect(component.attribute.name).toBeUndefined();
    expect(component.submitted).toBe(false);
  });
});
