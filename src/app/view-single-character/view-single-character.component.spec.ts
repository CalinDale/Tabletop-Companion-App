import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleCharacterComponent } from './view-single-character.component';

describe('ViewSingleCharacterComponent', () => {
  let component: ViewSingleCharacterComponent;
  let fixture: ComponentFixture<ViewSingleCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
