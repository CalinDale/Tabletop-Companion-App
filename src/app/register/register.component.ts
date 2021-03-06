import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { matchOtherValidator} from './matchOtherValidtator';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'displayName': [ '' , [
        Validators.required
        ]
    ],
      'email': [ '' , [
        Validators.required,
        Validators.email
        ]
    ],
    'password' : ['', [
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6),
      Validators.maxLength(25)
      ]
    ],
    'repeatPassword' : ['', [
      Validators.required,
      matchOtherValidator('password')
      ]
    ]

  });
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get repeatPassword() { return this.signupForm.get('repeatPassword'); }
  get displayName() { return this.signupForm.get('displayName'); }


  signup() {
    this.auth.emailSignUp(this.email.value, this.password.value)
    .then( () => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: this.displayName.value,
        photoURL: 'photo'
      }).then( () => {
        this.auth.updateUserData(user);
      }).then(() => {
        this.router.navigate(['/']);
      });
    });
  }
}
