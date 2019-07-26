import { Component, OnInit,ViewEncapsulation,OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {Observable} from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators,FormControl, FormArray } from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { ApplicationService } from  '../../services/application.service';
import { StateService } from  '../../services/state.service';
import { UniversityService } from  '../../services/university.service';
import { CourseService } from  '../../services/course.service';
import { CourseconfigService } from  '../../services/courseconfig.service';

export interface University {
  universitycode: string;
  universityname: string;
}


@Component({
  selector: 'app-qualificationinfo',
  templateUrl: './qualificationinfo.component.html',
  styleUrls: ['./qualificationinfo.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class QualificationinfoComponent implements OnInit {
 	
	qualificationForm: FormGroup; 
	states: any;
	courseconfigid:string;
	courseconfigs:any;
	coursesdata:any;
	applicationid:string;
	universities: any;
	validationError: any;
	private sub: any;
	application: any;
	reactiveUniversities:any;
	subjects: any;
	public mode:string;
	qualificationid:string;


	universityboardControl:FormControl=new FormControl("",Validators.required);
	nameofexamControl:FormControl=new FormControl("",Validators.required);
	courseControl:FormControl=new FormControl("");
	subjectControl:FormControl=new FormControl("");

	constructor(
			private router: ActivatedRoute, 
			private applicationService: ApplicationService, 
			private stateService: StateService,
			private universityService: UniversityService,
			private courseService: CourseService,
			private courseconfigService: CourseconfigService,
			private formBuilder: FormBuilder) 
	{ }

	ngOnInit() {

		this.mode='new';

		this.sub = this.router.params.subscribe(params => {
			this.applicationid = params.id; // (+) converts string 'id' to a number
			console.log("Row ID from param : "+this.applicationid);

			this.courseconfigid=params.courseconfigid;
			console.log("Courseconfig ID : "+this.courseconfigid);

			this.qualificationid=params.qualificationid;
			console.log("Qualification ID : "+this.qualificationid)

			if(!this.applicationid){
				console.log("Please provide Application ID");
			}
			if(!this.courseconfigid){
				console.log("Please provide Courseconfig ID");
			}


			if(this.qualificationid){
				this.mode='edit';
			}

			if(this.mode=='edit'){
				console.log('Inside edit');
				this.getqualification(params.id, params.qualificationid);
			}else{
				this.getcourseconfig(this.courseconfigid);
			}

			
		});

		this.qualificationForm = this.formBuilder.group({
			_id:[],
			nameofexam: this.nameofexamControl,
			course: this.courseControl,
			subject: this.subjectControl,
			yearofpassing: [undefined,Validators.required ],
			universityboard: this.universityboardControl,
			boardstate: [undefined],
			aggregate: [undefined],
			examclass: [undefined],
			examtype : ['TOTAL MARKS'],
			resultawaited : [false ],
			courseconfigid : [this.courseconfigid,Validators.required ],
			semesterwisemarks : this.formBuilder.array([
					this.initSemesterwisemarks(),
				])
		});


		this.getstates();
		this.getuniversities();

		this.reactiveUniversities=this.universityboardControl.valueChanges.pipe(
				startWith(this.universityboardControl.value),
				map(val=>this.displayFn(val)),
				map(name => this.filterUniversities(name))
			);


	}

	initSemesterwisemarks(){
		console.log('Init semesterwise marks');
		return this.formBuilder.group({
			semester : [undefined],
			marks : [undefined],
			grade : [undefined]
		});
	}

	addSemesterwisemarks(){
		console.log('Adding semester');
		const control = <FormArray>this.qualificationForm.controls['semesterwisemarks'];
		control.push(this.initSemesterwisemarks());
	}

	removeSemesterwisemarks(i:number){
		const control = <FormArray>this.qualificationForm.controls['semesterwisemarks'];
		control.removeAt(i);
	}


	displayFn(value: any): string {
		return value && typeof value === 'object' ? value.name : value;
	}

	filterUniversities(val: string) {
	    return val ? this._filter(this.universities, val) : this.universities;
	}


	filter(val: string):string[]{
		console.log('filter called');
		//return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase())===0);
		return val ? this._filter(this.universities, val) : this.universities;
	}

	private _filter(universities: University[], val: string) {
	    const filterValue = val.toLowerCase();
	    return universities.filter(university => university.universityname.toLowerCase().startsWith(filterValue));
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}


	getstates(){
		this.stateService.getstates().then((res)=>{
			this.states=res;
			console.log(this.states);
		},(err)=>{
			console.log(err);
			//this.applicationForm="Error";
		});
	}

	getuniversities(){
		this.universityService.getuniversities().then((res)=>{
			//this.applicationForm = this.formBuilder.group(res);
			//this.applicationForm.setValue(res);
			this.universities=res;
			console.log(this.states);
		},(err)=>{
			console.log(err);
			//this.applicationForm="Error";
		});
	}

	getcourseconfig(courseconfigid){
		this.courseconfigService.getcourseconfig(courseconfigid).then((res)=>{
			this.courseconfigs=res;
			
			console.log(this.courseconfigs);
			//	if courseconfig is available then get the course
			this.courseService.getcourses(courseconfigid).then((res)=>{
				this.coursesdata=res;
				this.nameofexamControl.setValue(this.coursesdata.nameofexam);
				if(this.coursesdata.courses.length==1){
					console.log('Its length is one');
					this.courseControl.setValue(this.coursesdata.courses[0].course);
					console.log('this.coursesdata.courses[0].subjects.length : '+this.coursesdata.courses[0].subjects.length);
						this.subjectControl.setValue(this.coursesdata.courses[0].subjects[0].subject);
					
				}else{
					console.log('Its length is more than one');
				}
				console.log(this.coursesdata);
			},(err)=>{
				console.log(err);
				//this.applicationForm="Error";
				console.log("Error while getting courses");
			});	

		},(err)=>{
			console.log(err);
			//this.applicationForm="Error";
			console.log("Error while getting courseconfigs");
		});

	}

	changeSubjects(paramCoursename){
		console.log('Event fired');
		/*for(let courses in this.coursesdata){
			console.log('course : '+courses.subject);
		}	
			*/

		//var coursesdata={"_id":"5a44878308237d3b989abbc9","nameofexam":"POSTGRADUATION","courseconfigid":3,"courses":[{"course":"M.SC","subjects":[{"subject":"PHYSICS"},{"subject":"MATHS"}]}]};
		console.log("Courses data : "+this.coursesdata.courses);
		console.log('length : '+this.coursesdata.courses.length);
		for(var i=0;i<this.coursesdata.courses.length;i++){
			console.log(obj);
			var obj=this.coursesdata.courses[i].subjects;
			if(paramCoursename==this.coursesdata.courses[i].course){
				this.subjects=this.coursesdata.courses[i].subjects;
				console.log('found data');
				for (var key in obj){
					console.log('key : '+key+', value : '+ obj[key].subject.toString());
				}
			}
		}
		//console.log(course);
	}

	

	getqualification(applicationid, qualificationid){
		console.log('getqualification');
		console.log("Application ID : "+qualificationid);

		var isQualificationFound:boolean;
		isQualificationFound=false;

		
		this.applicationService.getapplication(applicationid).then((res)=>{
			this.application=res;
			//this.experienceForm.patchValue(res);
			for(let qualification of this.application.qualifications){
				console.log('Qualification : ');
				console.log(qualification);
				if(qualification._id==qualificationid){
					console.log('Qualification Details : '+qualification);
					this.courseconfigid=qualification.courseconfigid;

					///getting the course details
					this.courseconfigService.getcourseconfig(this.courseconfigid).then((res)=>{
						this.courseconfigs=res;
						
						console.log(this.courseconfigs);
						//	if courseconfig is available then get the course
						this.courseService.getcourses(this.courseconfigid).then((res)=>{
							this.coursesdata=res;
							this.nameofexamControl.setValue(this.coursesdata.nameofexam);
							console.log(this.coursesdata);

							//set subjects 
							this.changeSubjects(qualification.course);

							// render form data
							this.qualificationForm.patchValue(qualification);

						},(err)=>{
							console.log(err);
							//this.applicationForm="Error";
							console.log("Error while getting courses");
						});	

					},(err)=>{
						console.log(err);
						//this.applicationForm="Error";
						console.log("Error while getting courseconfigs");
					});
					// getting course details ends here


					


					isQualificationFound=true;
					break;
				}
			}
			if(isQualificationFound){
				console.log('Qualifications found');	
			}else{
				console.log('Qualifications not found');
			}
			
			console.log(res);
		},(err)=>{
			console.log('Error while getting Experience');
			console.log(err);
			//this.applicationForm="Error";
		});
	}


	submitQualification(qualificationForm){
		console.log(qualificationForm);
		if(qualificationForm.value._id){
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
					/*for (var field in err.errors) {
console.log('var names : '+field.message);
					}*/

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
		}
	}

}