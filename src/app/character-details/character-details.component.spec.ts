import { UserProfileComponent } from './../user-profile/user-profile.component';
import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { CreateCharacterComponent } from './../create-character/create-character.component';
import { CharacterPageComponent } from './../character-page/character-page.component';
import { TrackerComponent } from './../tracker/tracker.component';
import { AppRoutingModule } from './../app-routing/app-routing.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailsComponent } from './character-details.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../../environments/environment';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CharacterDetailsComponent,
        TrackerComponent,
        CharacterPageComponent,
        CreateCharacterComponent,
        AddAttributeComponent,
        UserProfileComponent
      ],
      imports: [
        FormsModule,
        AppRoutingModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule // for database
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
