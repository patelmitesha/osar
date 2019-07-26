import { Component, OnInit,ViewEncapsulation,OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {Observable} from 'rxjs/Observable';

import { ApplicationService } from  '../../services/application.service';

@Component({
  selector: 'app-submitapplication',
  templateUrl: './submitapplication.component.html',
  styleUrls: ['./submitapplication.component.css']
})
export class SubmitapplicationComponent implements OnInit {
	
	private sub: any;
	applicationid:string;
	application: any;
	processing: boolean;
	showSpinner: boolean;
	msgCode:String;
	msgDetails:String;
	showMsg:boolean;
	msgIcon:String;

	constructor(
		private router: ActivatedRoute, 
		private applicationService: ApplicationService) { 
	}

	ngOnInit() {
			this.sub = this.router.params.subscribe(params => {
			this.applicationid = params.id; // (+) converts string 'id' to a number
			console.log("Row ID from param : "+this.applicationid);
		});
	}

	lockApplication(applicationId){
		console.log(applicationId);
		this.showMsg=true;
		this.processing=true;
		if(applicationId){
			this.applicationService.getapplication(applicationId).then((res)=>{
				this.application=res;
				this.application.islocked=true;

				console.log("Trying to lock application");
				this.applicationService.updateapplication(this.application).then((res)=>{
					this.processing=false;
					console.log('successfully inserted qualification data');
					this.msgDetails="Successfully Submitted";
					this.showMessage('success','msg007','');
					console.log(res);		  

				},(err) => { 
					this.processing=false;
					if(err._body){
					var error=JSON.parse(err._body);
					console.log(error);
						if (error) {
	  						console.log('Error while locking');
	  						this.showMessage('error','err0012','');
						}
					}

				 	//this.validationError=err._body;
				 	console.log("Error Response :"+err);  
				 	console.log("Error of qualifications : "+err._body.errors);
				 });	


			},(err)=>{
				if(err.status === 0){
					console.log('Network error');
					this.showMessage('error','err0011','Unable to connect');
				}else{
					console.log("Status : " + err.status);
					this.showMessage('error','err006',err);
				}
			})
		}
		/*if(qualificationForm.value._id){
			//update
		}else{
			//insert
			console.log("Trying to insert new qualification");
			this.applicationService.savequalification(this.applicationid, qualificationForm.value).then((res)=>{

				console.log('successfully inserted qualification data');
				
				console.log(res);		  

			},(err) => { 

				if(err._body){
				var error=JSON.parse(err._body);
				console.log(error);
					if (error) {

	  					if(error.name=='ValidationError') {
	  					this.validationError=error;

	  						console.log('Validation Error occured');
						}else{
							console.log('Validation passed');
						}
					}
				}

			 	//this.validationError=err._body;
			 	console.log("Error Response :"+err);  
			 	console.log("Error of qualifications : "+err._body.errors);
			 });	
		}*/
	}


	showMessage(msgType,msgCode,msg){
		console.log('showing message');
		this.showMsg=true;
		if(msgType=='processing'){
			this.msgIcon=null;
	       	this.processing=true;
		}
		if(msgType=='success'){
			this.msgIcon='check_circle';
			this.processing=false;
		}
		if(msgType=='error'){
			this.msgIcon='report';
			this.processing=false;
		}
		if(msgType=='warning'){
			this.msgIcon='report';
			this.processing=false;
		}
		this.msgCode=msgCode;
		// var tmpMsg=msgDetails;
		// console.log("Length : " + (msgDetails+'').trim().length);
		console.log("msgType : " + msgType);
		console.log("msgCode : " + msgCode);
		console.log("msgDetails : " + msg);

		if((msg+'').trim().length <= 0){
			this.msgDetails=null;	
		}else{
			this.msgDetails=msg;	
		}
		
	}
}
