import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchOtherValidator } from '../register/matchOtherValidtator';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.css']
})
export class EditUserAccountComponent implements OnInit {

  editDisplayNameForm: FormGroup;
  editEmailForm: FormGroup;
  editPasswordForm: FormGroup;

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder) {}
  ngOnInit() {

    this.editDisplayNameForm = this.fb.group({
      'displayName': [ '' , [
        Validators.required
        ]
    ]
  });

  this.editEmailForm = this.fb.group({
    'email': [ '' , [
      Validators.required,
      Validators.email
      ]
  ]
});

this.editPasswordForm = this.fb.group({
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


  get displayName() { return this.editDisplayNameForm.get('displayName'); }
  get email() { return this.editEmailForm.get('email'); }
  get password() { return this.editPasswordForm.get('password'); }

  changeName() {
    const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: this.displayName.value,
        photoURL: 'photo'
      }).then( () => {
        this.auth.updateUserData(user);
      });
  }

  changeEmail() {
    const user = firebase.auth().currentUser;
    user.updateEmail(this.email.value).then(function() {
      // Update Successful
    }).catch(function(error) {
      // An error happened
    }).then(( ) =>  {
      this.auth.updateUserData(user);
    });

  }

  changePassword() {
    const user = firebase.auth().currentUser;
    user.updatePassword(this.password.value).then(function() {
      // Update Successful
    }).catch(function(error){
      // An error happened
    }).then(( ) =>  {
      this.auth.updateUserData(user);
    });

  }

  deleteAccount() {
    firebase.auth().currentUser.delete()
    .then(() => this.router.navigate(['/login']));
  }

}
