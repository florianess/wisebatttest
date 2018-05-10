import { Component } from '@angular/core';
import { BackService } from './back.service';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Manager';
  log = false;
  add = false;

  constructor(private backService: BackService,public dialog: MatDialog){ }

  sign(){
    this.backService.sign(this.email,this.password)
    .subscribe((resp) => {
      console.log(resp.jwt)
    });
  }

  login(){
    this.backService.login(this.email,this.password)
      .subscribe((resp) => {
        window.localStorage['jwt'] = resp.jwt;
        this.log = true;
      })
  }

  openDialog(){
    const dialogRef = this.dialog.open(AppDialog);
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
})
export class AppDialog {
  constructor(public dialogRef: MatDialogRef<AppDialog>,private backService: BackService){}

  addTask(){
    this.dialogRef.close();
    this.backService.addTask(this.name,this.description)
      .subscribe((resp)=> console.log(resp));
  }
}
