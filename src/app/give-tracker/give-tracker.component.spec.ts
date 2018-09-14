import { CharacterService } from '../character.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveTrackerComponent } from './give-tracker.component';
import { AngularFireList } from 'angularfire2/database';
import { Character } from '../character';

// describe('ViewTrackerComponent', () => {
//  let component: ViewTrackerComponent;
//  let fixture: ComponentFixture<ViewTrackerComponent>;

//  beforeEach(async(() => {
//    TestBed.configureTestingModule({
//      declarations: [ ViewTrackerComponent ]
//    })
//    .compileComponents();
//  }));

//  beforeEach(() => {
//    fixture = TestBed.createComponent(ViewTrackerComponent);
//    component = fixture.componentInstance;
//    fixture.detectChanges();
//  });

//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });
// });

describe('GiveTrackerComponent', () => {
  let testCharacters: AngularFireList<Character>;
  let testCharacterService: CharacterService;

  beforeEach(() => {
  });
});
