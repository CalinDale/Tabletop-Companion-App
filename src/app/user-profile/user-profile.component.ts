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

  signInForm: FormGroup;

  constructor( public auth: AuthService, private fb: FormBuilder) {}
  ngOnInit() {
    this.signInForm = this.fb.group({
      'email': [ '' , [
        Validators.required,
        Validators.email
        ]
    ],
    'password' : ['', [
      Validators.minLength(6),
      Validators.maxLength(25)
      ]
    ]

  });
  }

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }

  signIn() {
    this.auth.emailLogin(this.email.value, this.password.value);
  }

}
