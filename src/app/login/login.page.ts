import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { Users } from '../users';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

/**
 * @description: Login use case
 */
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: Users[]
  loggedIn: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private userService: UsersService, 
    private router: Router,
    private alertCtrl: AlertController ) 
  {
    this.setLoginForm();
  }

  setLoginForm(){
    this.loginForm = this.fb.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    const username = this.loginForm.get('userid').value;
    const password = this.loginForm.get('password').value;
    if(this.user.some(u => u.username == username) == true && this.user.some(u => u.password == password) == true) {
      this.loggedIn = true;
      this.router.navigate(['/home']);
    }
    else{
      this.presentAlert();
      this.loginForm.reset();
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Invalid Username or Password.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((data: Users[]) => { this.user = data; });
  }

}
