import { Character } from './../character';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tracker-row',
  templateUrl: './tracker-row.component.html',
  styleUrls: ['./tracker-row.component.css']
})
export class TrackerRowComponent implements OnInit {

  @Input()character: Character;

  constructor() { }

  ngOnInit() {
  }

}
