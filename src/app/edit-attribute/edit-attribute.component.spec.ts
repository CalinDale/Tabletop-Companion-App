import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttributeComponent } from './edit-attribute.component';
import { AttributeService } from '../attribute.service';

describe('EditAttributeComponent', () => {
  let component: EditAttributeComponent;
  let testAttributeService: AttributeService;

  beforeEach(() => {
    component = new EditAttributeComponent(testAttributeService);
  });

  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
