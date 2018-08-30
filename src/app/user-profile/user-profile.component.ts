import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Observable, of } from 'rxjs';
import { EmailPasswordCredentials } from '../core/emailPasswordCredentials';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit{

  signupForm: FormGroup;
  newUser: boolean = true;
  passReset: boolean = false;

  constructor( public auth: AuthService, private fb: FormBuilder) {}
  
  ngOnInit(): void{
    this.signupForm = this.fb.group({
      'email': [ '' , [
        Validators.required,
        Validators.email
        ]
    ],
    'password' : ['',[
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6),
      Validators.maxLength(25)
      ]
    ]
  });

  }

  get email() { return this.signupForm.get('email') };
  get password() { return this.signupForm.get('password') };

  signup() {
    return this.auth.emailSignUp(this.email.value, this.password.value)
  }

  

}
