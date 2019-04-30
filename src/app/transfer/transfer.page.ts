import { Component, OnInit, destroyPlatform, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { Account } from '../account';
import { AtmService } from '../atm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})

/**
 * @description Transfer Funds use case
 */
export class TransferPage implements OnInit {
  transferForm: FormGroup;
  srcAccounts: Account[];
  destAccounts = [];
  src: String;
  dest: String;
  srcId: String;
  destId: String;
  srcBalance: number;
  destBalance: number;
  userid: string = "admin";
  objId: string;

  constructor(
    private fb: FormBuilder,
    private atmService: AtmService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController ) 
  { 
    this.setTransferForm();
  }


  setTransferForm(){
    this.transferForm = this.fb.group({
      srcAccount: ['', Validators.required],
      transferAmount: ['', Validators.required],
      destAccount: ['', Validators.required]
    });
  }

/**
 * Observation Pattern
 * @description: Subject is the source account. When it is clicked on (the event), it notifies the observer
 * (ionChange) of the option chosen and then changes the destination choices to only show the rest
 * of the accounts, not including the source account. 
 * 
 */
    makeChange(){    
      this.src = this.transferForm.get('srcAccount').value;
      console.log(this.src);
      if(this.src === 'Savings'){
        this.dest = 'Checking';
        console.log(this.dest);
        this.destAccounts = this.srcAccounts.filter(a => a.accounttype == this.dest);
      }
      else{
        this.dest = 'Savings';
        console.log(this.dest);
        this.destAccounts = this.srcAccounts.filter(a => a.accounttype == this.dest);
      }
      this.srcBalance = this.srcAccounts.find(s => s.accounttype == this.src).balance;
      this.srcId = this.srcAccounts.find(s => s.accounttype == this.src)._id;
      console.log(this.srcId);
      this.destBalance = this.destAccounts.find(d => d.accounttype == this.dest).balance;
      this.destId = this.destAccounts.find(d => d.accounttype == this.dest)._id;
      console.log(this.destId);
    }

    transfer(){
      const userid = this.userid;
      const transferAmount = this.transferForm.get('transferAmount').value;
      if(this.srcBalance >= transferAmount){
        const newSrcBalance = this.srcBalance - transferAmount;
        console.log('Source:' + newSrcBalance);
        const newDestBalance = this.destBalance + transferAmount;
        console.log('Destination:'+ newDestBalance);
        //source 
        this.atmService.updateAccount(userid, this.src, newSrcBalance, this.srcId);
        //dest
        this.atmService.updateAccount(userid, this.dest, newDestBalance, this.destId);
        this.presentAlert('Success!', 'You have successfully transferred $' + transferAmount + ' from ' + this.src + ' to ' + this.dest);
        this.transferForm.reset();
        this.router.navigate(['/home']);
      }

      else{
        this.presentAlert('Error', 'Insufficient Funds');
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
      this.atmService.getAccounts().subscribe((data: Account[]) => { this.srcAccounts = data; });
    } 
  }
  
