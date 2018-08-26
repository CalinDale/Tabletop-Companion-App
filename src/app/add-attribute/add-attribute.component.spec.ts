import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeComponent } from './add-attribute.component';
import { FormsModule } from '../../../node_modules/@angular/forms';

describe('AddAttributeComponent', () => {
  let component: AddAttributeComponent;
  let fixture: ComponentFixture<AddAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttributeComponent ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
