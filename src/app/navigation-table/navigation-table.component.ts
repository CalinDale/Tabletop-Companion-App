import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '../../../node_modules/@angular/common';

@Component({
  selector: 'app-navigation-table',
  templateUrl: './navigation-table.component.html',
  styleUrls: ['./navigation-table.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class NavigationTableComponent implements OnInit {

  constructor(private location: Location) {

  }

  ngOnInit() {
    this.selectOnOpen();
  }

  select(event) {
    const elements = document.getElementsByClassName('selected');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('selected'); // clear old active cells
    }
    event.currentTarget.classList.add('selected');
  }

  selectOnOpen() {
    if (this.location.path().includes('app')) {
      document.getElementById('appLink').classList.add('selected');
    } else if (this.location.path().includes('login')) {
      document.getElementById('accountLink').classList.add('selected');
    } else {
      document.getElementById('homeLink').classList.add('selected');
    }
  }

}
