import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AtmService } from '../atm.service';


@Component({
  selector: 'app-landing2',
  templateUrl: './landing2.page.html',
  styleUrls: ['./landing2.page.scss'],
})
export class Landing2Page implements OnInit {

  accounts: Account[];

  constructor(private atmService: AtmService) { }

  ngOnInit() {
    this.atmService.getAccounts()
    .subscribe((data: Account[]) => {
      this.accounts = data;
    });
  }

}
