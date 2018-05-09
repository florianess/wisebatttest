import { Component } from '@angular/core';
import { BackService } from './back.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Manager';
  log = false;
  add = false;

  constructor(private backService: BackService){ }

  sign(){
    this.backService.sign(this.email,this.password)
    .subscribe((resp) => {
      console.log(resp.jwt)
    });
  }

  login(){
    this.backService.login(this.email,this.password)
      .subscribe((resp) => {
        console.log(resp.jwt);
        window.localStorage['jwt'] = resp.jwt;
        this.log = true;
      })
  }

  addForm(){
    this.add = true;
  }

  addTask(){
    this.add = false;
    this.backService.addTask(this.name,this.description)
      .subscribe(()=>console.log("TEST"));
  }
}
