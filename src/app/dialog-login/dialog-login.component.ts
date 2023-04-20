import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginAuthService } from '../_services/login-auth.service';

export interface DialogData {
  username: string;
  password: string;
  token: string;
}

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
})
export class DialogLoginComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authdataService: LoginAuthService,
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: '',
      password: '',
      rememberMe: false,
    });
  }

  submitLogin(): void {
    this.authdataService
      .authLogin(
        this.signInForm.get('username').value,
        this.signInForm.get('password').value
      )
      .subscribe(
        (data) => {
          if (Object.prototype.hasOwnProperty.call(data['token'], 'error')) {
            // console.log('DialogLoginComponent: login: error', data);
          } else {
            this.data = this.signInForm.getRawValue();
            this.data['token'] = data['token'];
            this.dialogRef.close({ data: this.data });
          }
        },
        (error) => {
          console.log('AuthService: failed', error);
        }
      );
  }
}
