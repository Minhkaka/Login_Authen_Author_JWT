import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthdataService } from '../authdata.service';

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
    private authdataService: AuthdataService,
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  submitLogin(): void {
    this.authdataService
      .authLogin(this.data.username, this.data.password)
      .subscribe(
        (token) => {
          if (Object.prototype.hasOwnProperty.call(token, 'error')) {
            // console.log('DialogLoginComponent: login: error', data);
          } else {
            this.data.token = token;
            this.dialogRef.close({ data: this.data });
          }
        }, (error) => {
          console.log('AuthService: failed', error);
        });
  }
}
