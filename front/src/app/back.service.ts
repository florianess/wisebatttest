import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

interface Task {
  id: string;
  name: string;
  description: string;
  user_id: number;
}

interface User {
  email: string;
  password: string;
}

const url = "http://localhost:8080/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class BackService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Task[]>(url + "task");
  }

  login(email:string,pw:string) {
    return this.http.post(url+"login",JSON.stringify({email:email,password:pw}),httpOptions);
  }

  sign(email:string,pw:string) {
    return this.http.post(url+"sign",JSON.stringify({email:email,password:pw}),httpOptions);
  }

  addTask(name:string,desc:string){
    httpOptions.headers = httpOptions.headers.set('Authorization', window.localStorage['jwt']);
    return this.http.post(url+"task",JSON.stringify({name:name,description:desc}),httpOptions);
  }
}
