import { AttributeService } from './../attribute.service';
import { Component, OnInit } from '@angular/core';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.css']
})
export class AddAttributeComponent implements OnInit {

  attribute: Attribute = new Attribute();
  submitted = false;

  constructor(private attributeService: AttributeService) { }

  ngOnInit() {
  }

  newAttribute(): void {
    this.submitted = false;
    this.attribute = new Attribute();
  }

  save() {
    this.attributeService.createAttribute(this.attribute);
    this.attribute = new Attribute();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
