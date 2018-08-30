import { CharacterDetailsComponent } from './../character-details/character-details.component';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { CreateCharacterComponent } from './../create-character/create-character.component';
import { CharacterPageComponent } from './../character-page/character-page.component';
import { AppRoutingModule } from './../app-routing/app-routing.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { TestBed, inject } from '@angular/core/testing';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { TrackerComponent } from '../tracker/tracker.component';
import { AddAttributeComponent } from '../add-attribute/add-attribute.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrackerComponent,
        CharacterPageComponent,
        CreateCharacterComponent,
        AddAttributeComponent,
        UserProfileComponent,
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
        AngularFireDatabaseModule, // for database
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
