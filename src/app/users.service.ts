import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  addUsers(username, password)
  {
    const obj = {
      username: username,
      password: password
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }

  getUsers() 
  {
    return this
           .http
           .get(`${this.uri}`);
  }
}
