import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs';
import { ApplicationService } from  '../../services/application.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
	selector: 'app-experienceinfo',
	templateUrl: './experienceinfo.component.html',
	styleUrls: ['./experienceinfo.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ExperienceinfoComponent implements OnInit {
	private sub: any;
	public id:string;
	public experienceid:string;
	public mode:string;
	application : any;

	experienceForm: FormGroup; 
	validationError: any;

	processing: boolean;
	showSpinner: boolean;
	msgCode:String;
	msgDetails:String;
	showMsg:boolean;
	msgIcon:String;
	
	today = new Date();
	minFromDate = new Date(this.today.getFullYear()-60, this.today.getMonth(), this.today.getDate());
	maxFromDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());

	minToDate = new Date(this.today.getFullYear()-60, this.today.getMonth(), this.today.getDate());
	maxToDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());

	constructor(private router: ActivatedRoute, private applicationService: ApplicationService, private formBuilder: FormBuilder) { 
		this.processing=false;
		this.showSpinner=false;
		this.showMsg=false;
	}

	
	ngOnInit() {
		this.mode='new';

		console.log("Inside on init personal info component");
		this.sub = this.router.params.subscribe(params => {
       this.id = params.id; // (+) converts string 'id' to a number
       console.log("Row ID from param : "+this.id);
       
       this.experienceid = params.experienceid;
       console.log("Experience ID from param : "+this.experienceid);
       if(this.experienceid){
       	this.mode='edit';
       }

       this.experienceForm = this.formBuilder.group({
       	_id:[],
       	postheld: [undefined ,[Validators.required, Validators.maxLength(200),Validators.pattern('^[a-zA-Z -]+$')]],
       	fromdate: [undefined,[Validators.required]],
		todate: [undefined,[Validators.required]],
		dateErr:null,
       	months: [undefined,[Validators.required,Validators.maxLength(4), Validators.pattern('^[0-9]+$'),Validators.min(1)]],
       	salarydrawn: [undefined,[Validators.required,Validators.maxLength(10), Validators.pattern('^[0-9]+$'),Validators.min(1)]],
       	nameoforganization: [undefined,[Validators.required, Validators.maxLength(200),Validators.pattern('^[a-zA-Z0-9 -]+$')]],
       	natureofduty: [undefined,[Validators.required, Validators.maxLength(200),Validators.pattern('^[a-zA-Z -]+$')]],
       },{ validator: Validators.compose([
        this.dateLessThan('fromdate', 'todate',{ 'dateErr': true })
    ])});

       if(this.mode=='edit'){
       	console.log('Inside edit');
       	this.getexperience(params.id, params.experienceid);
       }


   });
	}

		dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
			return (c: AbstractControl): { [key: string]: boolean } | null => {
				const date1 = c.get(dateField1).value;
				const date2 = c.get(dateField2).value;
				//console.log("date1 : "+date1+", date2 : "+date2);
				if ((date1 !== null && date2 !== null) && (date1 > date2)) {					
					return validatorField;
				}else{
				/*	this.experienceForm.patchValue({
						['months']:25
					});*/
					//c.get(months).setValue(25);
					//this.experienceForm.controls['months'].setValue(25);
					//this.experienceForm.setValue({months:25});
				}
				return null;
			};
		}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}



	addExperience(experienceForm){


			console.log(experienceForm);
			if(experienceForm.value._id){
			//update
			console.log("Trying to update data");
			this.showMessage('processing','msg003','');
			this.applicationService.updateexperience(this.id, experienceForm.value).then((res)=>{
				console.log(res);
				this.showMessage('success','msg011','');
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

			console.log("Trying to insert new qualification");
			this.applicationService.saveexperience(this.id, experienceForm.value).then((res)=>{

				console.log('successfully inserted data');
				this.showMessage('success','msg010','');
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

	getexperience(applicationid, experienceid){
		console.log('getexperience');
		console.log("Application ID : "+applicationid);

		var isExperienceFound:boolean;
		isExperienceFound=false;

		this.applicationService.getapplication(applicationid).then((res)=>{
			this.application=res;
			//this.experienceForm.patchValue(res);
			for(let experience of this.application.experiences){
				console.log('Experience : ');
				console.log(experience);
				if(experience._id==experienceid){
					console.log('Experience Details : '+experience);
					this.experienceForm.patchValue(experience);
					isExperienceFound=true;
					break;
				}
			}
			if(isExperienceFound){
				console.log('Experience found');	
			}else{
				console.log('Experience not found');
			}
			
			console.log(res);
		},(err)=>{
			console.log('Error while getting Experience');
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


