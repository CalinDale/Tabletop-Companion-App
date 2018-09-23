import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tabletop-Companion-App';

  select(event) {
    const elements = document.getElementsByClassName('selected');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('selected'); // clear old active cells
    }
    event.currentTarget.classList.add('selected');
  }
}
