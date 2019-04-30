import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AtmService } from '../atm.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})

/**
 * @description Check Balance use case
 */
export class BalancePage implements OnInit {

  accounts: Account[];
  
  constructor(private atmservice: AtmService) {}

  /**
   * Observer Pattern
   * @description Subscribes to  accounts and any changes and dynamically sets the account array to account for changes.
   * Account data is formatted in the html file.
   */
  
  ngOnInit() {
    this.atmservice.getAccounts()
    .subscribe((data: Account[]) => {
      this.accounts = data;
    });
  }

}


