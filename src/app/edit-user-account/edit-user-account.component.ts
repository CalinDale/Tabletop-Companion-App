import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { matchOtherValidator } from '../register/matchOtherValidtator';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.css']
})
export class EditUserAccountComponent implements OnInit {

  editAccountForm: FormGroup;
  deleteForm: FormGroup;
  changesSaved: Boolean;
  errorOccured: Boolean;

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.editAccountForm = this.fb.group({
      'username': [ '' , [
        ]
      ],
      'email': [ '' , [
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
        matchOtherValidator('password')
        ]
      ]/*,
      'passwordCheck' : ['', [
        Validators.required,
        Validators.
        ]
      ]*/
    });
    this.deleteForm = this.fb.group({
      'password' : ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
        ]
      ]
    });
  }

  get displayName() { return this.editAccountForm.get('username'); }
  get email() { return this.editAccountForm.get('email'); }
  get password() { return this.editAccountForm.get('password'); }
  get repeatPassword() { return this.editAccountForm.get('repeatPassword'); }
  get passwordDelete() { return this.deleteForm.get('password'); }

  saveChanges() {
    this.changesSaved = true;
    this.errorOccured = false;
    if (this.displayName.value !== '') {
      this.changeName();
    }
    if (this.email.value !== '') {
      this.changeEmail();
    }
    if (this.password.value !== '') {
      this.changePassword();
    }
  }

  resetMessage() {
    this.changesSaved = false;
    this.errorOccured = false;
  }

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
    }).catch(function(error) {
      this.changesSaved = false;
      this.errorOccured = true;
    }).then(( ) =>  {
      this.auth.updateUserData(user);
    });

  }

  changePassword() {
    const user = firebase.auth().currentUser;
    user.updatePassword(this.password.value).then(function() {
      // Update Successful
    }).catch(function(error) {
      this.changesSaved = false;
      this.errorOccured = true;
    }).then(( ) =>  {
      this.auth.updateUserData(user);
    });
  }

  deleteAccount() {
    const currentUser = firebase.auth().currentUser;
    this.auth.emailLogin( currentUser.email, this.passwordDelete.value ).then(() => {
      firebase.auth().currentUser.delete()
    .then(() => this.router.navigate(['/home']));
    });
  }
}
