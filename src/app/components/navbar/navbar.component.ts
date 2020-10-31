import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  userName: any = '';
  constructor(public authServ : AuthService,private _Router:Router) {
    // check if is logged in or not 
   
     this.userName = localStorage.getItem('loggedUser');
   }
  ngOnInit() {
  }
LogOut() {
  localStorage.clear();
  this._Router.navigate(['/signin'])
  this.userName = '';
 
}

}
