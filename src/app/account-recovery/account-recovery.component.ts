import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css']
})
export class AccountRecoveryComponent implements OnInit {

  accountRecoveryForm: FormGroup;

  constructor( public auth: AuthService, private fb: FormBuilder) {}
  ngOnInit() {
    this.accountRecoveryForm = this.fb.group({
      'email': [ '' , [
        Validators.required,
        Validators.email
        ]
    ]
  });
  }

  get email() { return this.accountRecoveryForm.get('email'); }

  accountRecover() {
    this.auth.resetPassword(this.email.value);
  }

}
