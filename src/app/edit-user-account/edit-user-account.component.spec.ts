import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAccountComponent } from './edit-user-account.component';

describe('EditUserAccountComponent', () => {
  let component: EditUserAccountComponent;
  let fixture: ComponentFixture<EditUserAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: test this component
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
