import { TestBed, inject } from '@angular/core/testing';

import { CharacterService } from './character.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

describe('CharacterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterService],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule, // for database
      ]
    });
  });

  it('should be created', inject([CharacterService], (service: CharacterService) => {
    expect(service).toBeTruthy();
  }));
});
