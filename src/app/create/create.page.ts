import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { AtmService } from '../atm.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {


  createaccountForm: FormGroup;
  userid: string = 'admin';
  accounttype: string;
  balance: number;


  constructor(private fb: FormBuilder, private atmservice: AtmService) {
    this.setCreateAccountForm();
   }

  

 setCreateAccountForm(){
    this.createaccountForm = this.fb.group({
      accounttype: ['', Validators.required],
      balance: ['', Validators.required]
    });
  }

  addAccount(){
    console.log(this.createaccountForm.get('accounttype').value);
    console.log(this.createaccountForm.get('balance').value);
    const accountype = this.createaccountForm.get('accounttype').value;
    const balance = this.createaccountForm.get('balance').value;
    const userid = this.userid;

    this.atmservice.addAccount(userid, accountype, balance);
  }

  ngOnInit() {
  
  }


  
  
  




}
