import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AtmService } from '../atm.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  accounts: Account[];

  constructor(private atmService: AtmService) { }

  ngOnInit() {
    this.atmService.getAccounts()
    .subscribe((data: Account[]) => {
      this.accounts = data;
    });
  }

}
