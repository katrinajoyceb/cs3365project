import { Component, OnInit } from '@angular/core';
import { AtmService } from '../atm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})

/**
 * @description: Withdraw use case
 */
export class WithdrawPage implements OnInit {
  
  accounts: Account[];
  account: any = {};
  withdrawForm: FormGroup;
  userid: string = "admin";

  constructor(
    private fb: FormBuilder, 
    private atmService: AtmService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private alertCtrl: AlertController ) 
    {
      this.setWithdrawForm();
    }

  setWithdrawForm(){
    this.withdrawForm = this.fb.group({
      withdrawamount: ['', Validators.required],
      accounttype: ['', Validators.required]
    });
  }
  
  withdraw(){
    const withdrawamount = this.withdrawForm.get('withdrawamount').value;
    const accounttype = this.withdrawForm.get('accounttype').value;
    const userid = this.userid;
    if(this.account.balance >= withdrawamount){
      const balance = this.account.balance - withdrawamount;
      this.route.params.subscribe(params => {
        this.atmService.updateAccount(userid, accounttype, balance, params['id']);
        this.presentAlert('Success!', 'You have successfully withdrawed $' + withdrawamount + ' from ' + accounttype);
        this.router.navigate(['/home']);
      });
      console.log(balance);
      this.withdrawForm.reset();
    }
    else{
      this.presentAlert('Error', 'Insufficient Funds.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.atmService.getAccounts().subscribe((data: Account[]) => { this.accounts = data; });
    this.route.params.subscribe(params => {
      this.atmService.editAccount(params['id']).subscribe(res => {
        this.account = res;
      });
    });
  }
  
}
