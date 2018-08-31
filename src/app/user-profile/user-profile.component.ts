import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { EmailPasswordCredentials } from '../core/emailPasswordCredentials';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  signupForm: FormGroup;
  newUser = true;
  passReset = false;

  constructor( public auth: AuthService, private fb: FormBuilder) {}
  ngOnInit() {
  }

}
