import { CharacterDetailsComponent } from './../character-details/character-details.component';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { CharacterPageComponent } from './../character-page/character-page.component';
import { TrackerComponent } from './../tracker/tracker.component';
import { AppRoutingModule } from './../app-routing/app-routing.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { environment } from '../../environments/environment';
import { CreateCharacterComponent } from '../create-character/create-character.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';

describe('AuthGuard', () => {
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
        AuthGuard,
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

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
