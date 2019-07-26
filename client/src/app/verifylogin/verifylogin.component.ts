import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs';
import { MaterialModule } from '../material.module';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { LoginService } from  '../services/login.service';

import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';


@Component({
  selector: 'app-verifylogin',
  templateUrl: './verifylogin.component.html',
  styleUrls: ['./verifylogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VerifyloginComponent implements OnInit {

  error:any;
  success:any;
  verificationForm: FormGroup; 

	constructor(
		private router: ActivatedRoute, 
		private loginService: LoginService, 
		private formBuilder: FormBuilder, 
		public snackBar: MatSnackBar) 
	{
	}

	ngOnInit() {
		this.verificationForm = this.formBuilder.group({
	       email: ['' ,Validators.required],
	       otp: ['',Validators.required]
	     });
	}

	doVerify(verificationForm){
		let config = new MatSnackBarConfig();
	    config.verticalPosition = 'bottom';
	    config.horizontalPosition = 'center';
	    config.duration = 10000;

		this.loginService.verify(verificationForm.value).then(
			(res)=>{
	          this.success="msg002"; 
	          console.log(this.success);		  
	          this.snackBar.open("Successfully Verified",undefined,config);
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
	}
}
