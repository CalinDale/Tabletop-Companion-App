import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {




  constructor(public auth: AuthService) { }

  

}
