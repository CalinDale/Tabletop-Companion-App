import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCharacterDetailsComponent } from './single-character-details.component';

describe('SingleCharacterDetailsComponent', () => {
  let component: SingleCharacterDetailsComponent;
  let fixture: ComponentFixture<SingleCharacterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCharacterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCharacterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
