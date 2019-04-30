import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { Account } from '../account';
import { AtmService } from '../atm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})

/**
 * @description: Deposit usecase
 */
export class DepositPage implements OnInit {

  accounts: Account[];
  account: any = {};
  depositForm: FormGroup;
  userid: string = "admin";

  constructor(
    private fb: FormBuilder, 
    private atmService: AtmService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private alertCtrl: AlertController) 
  {
    this.setDepositForm();
  }

  setDepositForm(){
    this.depositForm = this.fb.group({
      depositamount: ['', Validators.required],
      accounttype: ['', Validators.required]
    });
  }

  /**
   * @description deposit funds use case
   */
  deposit(){
    const depositamount = this.depositForm.get('depositamount').value;
    const accounttype = this.depositForm.get('accounttype').value;
    const balance = depositamount + this.account.balance;
    const userid = this.userid;
    this.route.params.subscribe(params => {
      this.atmService.updateAccount(userid, accounttype, balance, params['id']);
      this.presentAlert('Success!', 'You have deposited $' + depositamount + ' to ' + accounttype);
      this.router.navigate(['/home']);
    });
    this.depositForm.reset();
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
