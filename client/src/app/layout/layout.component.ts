import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs';
import { LoginService } from  '../services/login.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LayoutComponent implements OnInit {

  screenWidth: number;

  constructor(private router: Router, private loginService: LoginService) { 
   this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    //remove below given function 
  //	this.checkLogin();
  }

  checkLogin(){
  	alert("Token : " +localStorage.getItem("token"));
  	if(!this.loginService.isLoggedIn()){
  		this.tryLogout();
  	}
  }

  tryLogout(){
    this.loginService.logout();
    	console.log("Logout success");	 
    	this.router.navigate(['index']);
  }
 
}




