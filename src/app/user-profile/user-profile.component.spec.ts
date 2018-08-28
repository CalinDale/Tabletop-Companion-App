import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { CreateCharacterComponent } from './../create-character/create-character.component';
import { CharacterPageComponent } from './../character-page/character-page.component';
import { TrackerComponent } from './../tracker/tracker.component';
import { AppRoutingModule } from './../app-routing/app-routing.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../core/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../../environments/environment';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
         UserProfileComponent,
         TrackerComponent,
         CharacterPageComponent,
         CreateCharacterComponent,
         AddAttributeComponent,
         CharacterDetailsComponent
      ],
      providers: [
        AuthService,
        AngularFireAuth,
        AngularFirestore,
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      imports: [
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule // for database
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
