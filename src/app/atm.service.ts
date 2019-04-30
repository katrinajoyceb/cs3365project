import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtmService {

  uri = 'http://localhost:4000/account';
 // uri = 'https://my-json-server.typicode.com/katrinajoyceb/test-server/account';

  constructor(private http: HttpClient) { }

  //add accounts with default balance
  addAccount(userid, accounttype, balance){
    const obj = {
      userid: userid,
      accounttype: accounttype,
      balance: balance
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj).subscribe(res => console.log('Done'));
  }

  // getPost(){
  //   return this.http.get(`${this.url}`);
  // }


  getAccounts(){
    return this.http.get(`${this.uri}`);
  }

  editAccount(id){
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateAccount(userid, accounttype, balance, id){
    const obj = {
      userid: userid,
      accounttype: accounttype,
      balance: balance
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

}
