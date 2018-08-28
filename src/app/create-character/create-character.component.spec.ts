import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterComponent } from './create-character.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../../environments/environment';

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCharacterComponent ],
      imports: [
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule // for database
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
