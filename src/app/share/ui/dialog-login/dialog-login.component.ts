import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginAuthService } from 'src/app/_services/login-auth.service';

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
  constructor(
    private authdataService: LoginAuthService,
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  submitLogin(): void {
    this.authdataService
      .authLogin(this.data.username, this.data.password)
      .subscribe(
        (data) => {
          if (Object.prototype.hasOwnProperty.call(data['token'], 'error')) {
            // console.log('DialogLoginComponent: login: error', data);
          } else {
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
