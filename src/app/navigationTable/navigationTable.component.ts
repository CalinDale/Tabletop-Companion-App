import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigationTable',
  templateUrl: './navigationTable.component.html',
  styleUrls: ['./navigationTable.component.css']
})
export class NavigationTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  select(event) {
    const elements = document.getElementsByClassName('selected');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('selected'); // clear old active cells
    }
    event.currentTarget.classList.add('selected');
  }

}
