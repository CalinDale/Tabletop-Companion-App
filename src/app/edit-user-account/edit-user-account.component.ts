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
      'deleteConfirm': [ '' , [
        Validators.pattern('^DELETE$'),
        Validators.required
        ]
      ]
    });
  }

  get displayName() { return this.editAccountForm.get('username'); }
  get email() { return this.editAccountForm.get('email'); }
  get password() { return this.editAccountForm.get('password'); }

  saveChanges() {
    if (this.displayName.value !== '') {
      this.changeName();
    }
    if (this.email.value !== '') {
      this.changeName();
    }
    if (this.password.value !== '') {
      this.changeName();
    }
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
    }).catch(function(error) {
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
