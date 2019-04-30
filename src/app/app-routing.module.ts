import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'balance', loadChildren: './balance/balance.module#BalancePageModule' },
  { path: 'withdraw/:id', loadChildren: './withdraw/withdraw.module#WithdrawPageModule' },
  { path: 'edit/:id', loadChildren: './deposit/deposit.module#DepositPageModule' },
  { path: 'transfer', loadChildren: './transfer/transfer.module#TransferPageModule' },
  { path: 'create', loadChildren: './create/create.module#CreatePageModule' },
  { path: 'landing', loadChildren: './landing/landing.module#LandingPageModule' },
  { path: 'landing2', loadChildren: './landing2/landing2.module#Landing2PageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
