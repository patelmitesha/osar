import { Component, OnInit,ViewEncapsulation,OnDestroy } from '@angular/core';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ApplicationService } from  '../../services/application.service';


@Component({
	selector: 'app-personalinfo',
	templateUrl: './personalinfo.component.html',
	styleUrls: ['./personalinfo.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PersonalinfoComponent implements OnInit {

	private sub: any;
	id: number;
	validationError: any;
	applicationForm: FormGroup;
	processing: boolean;
	showSpinner: boolean;
	msgCode:String;
	msgDetails:String;
	showMsg:boolean;
	msgIcon:String;

	constructor(private router: ActivatedRoute, private applicationService: ApplicationService, private formBuilder: FormBuilder) { 
		this.processing=false;
		this.showSpinner=false;
		this.showMsg=false;
	}


	ngOnInit() {
		console.log("Inside on init personal info component");
		this.sub = this.router.params.subscribe(params => {
       this.id = params.id; // (+) converts string 'id' to a number
       console.log("Row ID from param : "+this.id);
       // In a real app: dispatch action to load the details here.
       //this.getapplication(this.id);
       if(this.id){
       	this.getapplication(this.id);
       }

		this.applicationForm = this.formBuilder.group({
	       	_id:[],
	       	salutation: ['Shri' ,Validators.required],
	       	firstname: [undefined ,[Validators.required, Validators.maxLength(50)]],
	       	fatherhusbandname: [undefined,[Validators.required, Validators.maxLength(50)]],
	       	gender: ['Male',Validators.required],
	       	category: ['GEN',Validators.required],
	       	dateofbirth: [(new Date()).toISOString,Validators.required],
	       	nationality: ['INDIAN',[Validators.required, Validators.maxLength(30)]],
	       	buildingno: [undefined,[Validators.required, Validators.maxLength(100)]],
	       	street: [undefined,[Validators.maxLength(100)]],
	       	area: [undefined,[Validators.maxLength(100)]],
	       	city: [undefined,[Validators.required, Validators.maxLength(100)]],
	       	state: [undefined,[Validators.required, Validators.maxLength(50)]],
	       	country: ['INDIA',[Validators.required, Validators.maxLength(20)]],
	       	pincode: [undefined,[Validators.required, Validators.maxLength(10)]],
	       	telno: [undefined,[Validators.maxLength(20)]],
	       	mobno: [undefined,[Validators.required, Validators.maxLength(12)]],
	       	nearestrlystn: [undefined,[Validators.required, Validators.maxLength(30)]],
	       	advertisementno: [undefined,[Validators.required, Validators.maxLength(4)]],
	       	postcode: [undefined,[Validators.required, Validators.maxLength(2)]],
	       	subjectcode: [undefined,[Validators.required, Validators.maxLength(2)]],
	       	physicalhandicap: [false,Validators.required],
	       	handicaptype:[undefined,[Validators.maxLength(20)]],
	       	handicapdetails: [undefined,[Validators.maxLength(100)]],
	       	govtserv: [false,Validators.required],
	       	exserviceman: [false,Validators.required],
	       	exservicemanfrom: [undefined,[Validators.maxLength(20)]],
	       	dateofreleived: [undefined]

	       });
	   });
	}


	ngOnDestroy() {
		this.sub.unsubscribe();
	}


	submitApplication(applicationForm){
		this.processing=true;
		console.log("inside submit application");
		console.log(applicationForm.value);
		console.log("Application ID : " + this.id);
		console.log("Date of Birth : " + applicationForm.value.dateofbirth);
		if(applicationForm.value._id){
			console.log("Trying to update data");
			this.showMessage('processing','msg003','');
			this.applicationService.updateapplication(applicationForm.value).then((res)=>{
				console.log(res);
				this.showMessage('success','msg004','');
			},(err) => {
				this.clearMessage();
				console.log("Error occured: "+err.status);
				console.log(err);
				if(err.status == 0){
					this.showMessage('error','err0011','');
				}else{
					if(err._body){
						try{
							var error=JSON.parse(err._body);
							if (error) {
								// for (var field in error.errors) {
								// 	console.log('err : '+field);
								// }
								console.log('error : ');

			  					if(err.status==422) {
			  						console.log('inside 422');
			  						console.log(error);
				  					this.validationError=error.errors;
				  					this.showMessage('error','err0010',error);
								}
							}
						}catch(e){
							console.log(e);
							this.showMessage('error','err006',e);
						}
				
					// console.log(error);
						
					}else{
						if(err.status === 0){
							console.log('Network error');
							this.showMessage('error','err0011','Unable to connect');
						}else{
							console.log("Status : " + err.status);
							this.showMessage('error','err006',err);
						}

					}
				}
				

			});
		}else{
			this.clearMessage();

			console.log("Trying to insert new data");
			this.applicationService.saveapplication(applicationForm.value).then((res)=>{

				console.log('successfully inserted data');
				this.showMessage('success','msg004','');
			},(err) => { 

				if(err._body){
				var error=JSON.parse(err._body);
				console.log(error);
					if (error) {
					/*for (var field in err.errors) {
console.log('var names : '+field.message);
					}*/

	  					if (err) {
		  					if(err.status==422) {
		  						console.log('While inserting validation Error occured');
		  						this.validationError=err._body;
		  						this.showMessage('error','err010','');
							}else{
								this.validationError=null;
								this.showMessage('error','err006',err);
							}
						}

					}
				}else{
					this.showMessage('error','err006',err);
				}

				this.processing=true;
			 	//this.validationError=err._body;
			 	console.log("Error Response :"+err);  
			 	console.log("Error of subjectcode : "+err._body.errors);
			 });	
		}
		
	}

	getapplication(applicationid){
		this.showMessage('processing','msg003','');
		console.log("Application ID : "+applicationid);
		this.applicationService.getapplication(applicationid).then((res)=>{
			//this.applicationForm = this.formBuilder.group(res);
			//this.applicationForm.setValue(res);
			this.applicationForm.patchValue(res);

	       	this.clearMessage();

			console.log(this.applicationForm);
		},(err)=>{
	       	this.showMessage('error','err006',err);

			console.log(err);
			//this.applicationForm="Error";
		});
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
	clearMessage(){
		this.showMsg=false;
		this.processing=false;
		this.msgDetails=null;
		this.msgCode=null;
	}

}