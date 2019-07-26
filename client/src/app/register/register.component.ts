import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs';
import { LoginService } from  '../services/login.service';
import { MaterialModule } from '../material.module';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class RegisterComponent implements OnInit {

  registering:boolean;
  hidepassowrd : boolean;
  hideconfirmpassword:boolean;
  error:any;
  success:any;
  registrationForm: FormGroup; 


  constructor(
    private router: ActivatedRoute, 
    private loginService: LoginService, 
    private formBuilder: FormBuilder, 
    public snackBar: MatSnackBar) 
  { 
  }

  ngOnInit() {
  	this.hidepassowrd=true;
  	this.hideconfirmpassword=true;


     this.registrationForm = this.formBuilder.group({
       username: ['' ,Validators.required],
       email: ['' ,Validators.required],
       mobileno: ['',Validators.required],
       password: ['',Validators.required],
       confirmpassword: ['',Validators.required]
     });

  }

  doReigster(registrationForm){
    this.registering=true;
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 10000;

  	console.log(registrationForm.value);
    this.loginService.register(registrationForm.value).then(
        (res)=>{
          this.success="msg001"; 
          console.log(this.success);		  
          this.snackBar.open("Successfully Registered",undefined,config);
        },(err) => {  	
          if(err.status==400){
            console.log("Request error");
            var errordetails=JSON.parse(err._body);
            this.error=errordetails.errors[0].code;
            this.snackBar.open("Error : " + errordetails.errors[0].message,undefined,config);
          }else{
            console.log("Server error");
            console.log(err);
            var errordetails=JSON.parse(err._body);
             console.log("msg :"+errordetails.errmsg);
             this.error="err006";
             this.snackBar.open("Error : " + errordetails.errmsg,undefined,config);
          }
        }
      );

    this.registering=false;
  }
}