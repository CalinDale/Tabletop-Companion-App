import { TestBed, inject } from '@angular/core/testing';

import { AttributeService } from './attribute.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

describe('AttributeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeService],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule, // for database
      ]
    });
  });

  it('should be created', inject([AttributeService], (service: AttributeService) => {
    expect(service).toBeTruthy();
  }));
});
