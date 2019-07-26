import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs';
import { ApplicationService } from  '../../services/application.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

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

  constructor(private router: ActivatedRoute, private applicationService: ApplicationService, private formBuilder: FormBuilder) { 
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
			postheld: [undefined ,Validators.required],
			fromdate: [undefined],
			todate: [undefined ],
			months: [undefined,Validators.required ],
			salarydrawn: [undefined],
			nameoforganization: [undefined],
			natureofduty: [undefined]
		});

		if(this.mode=='edit'){
			console.log('Inside edit');
			this.getexperience(params.id, params.experienceid);
		}

 
   });
	}


	ngOnDestroy() {
		this.sub.unsubscribe();
	}



	addExperience(experienceForm){
		console.log("inside submit experience");
		console.log(experienceForm.value);
		console.log("Application ID : " + this.id);
		console.log("From Date : "+ experienceForm.value.fromdate);
		//console.log("From Date New : "+ experienceForm.value.fromdate.toLocaleTimeString());
		console.log("To Date : "+ experienceForm.value.todate);
		if(experienceForm.value._id){
			console.log("Trying to update data");
			this.applicationService.updateexperience(this.id,experienceForm.value).then((res)=>{
				console.log(res);		  
			},(err) => {  	
				this.validationError=err._body;
				if (err) {
						if(err.name=='ValidationError') {
							console.log('Validation Error occured');
					}
				}

				console.log(err);  
			});
		}else{
			console.log("From Date : "+ experienceForm.value.fromdate);
			//console.log("From Date New : "+ experienceForm.value.fromdate.toLocaleTimeString());

			console.log("Trying to insert new experienceForm");
			this.applicationService.saveexperience(this.id, experienceForm.value).then((res)=>{

				console.log('successfully inserted data');
				
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



}


