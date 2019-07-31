import { Component, OnInit,ViewEncapsulation,OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {Observable} from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators,FormControl, FormArray, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
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

	processing: boolean;
	showSpinner: boolean;
	msgCode:String;
	msgDetails:String;
	showMsg:boolean;
	msgIcon:String;

	semErrFlag:boolean;
	semErrMsg:String;

	semesterwiseMarksValueChanges$;

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
	{ 
		this.processing=false;
		this.showSpinner=false;
		this.showMsg=false;
	}

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
			yearofpassing: [undefined,[Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(4)]],
			universityboard: this.universityboardControl,
			boardstate: [undefined],
			aggregate: [undefined,[Validators.required,Validators.pattern('^[0-9.]+$'),Validators.maxLength(5)]],
			examclass: [undefined,[Validators.required,Validators.pattern('^[a-zA-Z ]+$'),Validators.maxLength(50)]],
			examtype : ['Total Marks'],
			resultawaited : [false ],
			courseconfigid : [this.courseconfigid,Validators.required ],
			semesterwisemarks : this.formBuilder.array([
					this.initSemesterwisemarks(),
				])
		});
		//this.qualificationForm.controls.semesterwisemarks.setValidators(this.comparisonValidator());
		//this.semesterwiseMarksValueChanges$ = this.qualificationForm.controls['semesterwisemarks'].valueChanges;

		//this.semesterwiseMarksValueChanges$.subscribe(semesterwisemarks => this.updateSemWiseMarks(semesterwisemarks));
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
			semester : [undefined,[Validators.pattern('^[a-zA-Z .-]+$'),Validators.maxLength(50)]],
			marks : [undefined,[Validators.pattern('^[0-9.]+$'),Validators.maxLength(5)]],
			grade : [undefined,[Validators.pattern('^[a-zA-Z ]+$'),Validators.maxLength(50)]],
			semErr : null
		},{ validator: Validators.compose([
			this.validateSemWiseMarks('semester', 'marks','grade',{ 'semErr': true })
		])});
	}

	validateSemWiseMarks(semester: string, marks: string,grade: string, validatorField: { [key: string]: boolean }): ValidatorFn {
		return (c: AbstractControl): { [key: string]: boolean } | null => {
			const sem = c.get(semester).value;
			const mrk = c.get(marks).value;
			const grd = c.get(grade).value;
			//console.log("sem : "+sem+", mrk : "+mrk+", grd: "+grd);
			if ((sem !== null) && (mrk === null || grd === null)) {	
				console.error("error");
				return validatorField;
			}else{
				console.log("hello rest");
				//c.get(months).setValue(25);
				//this.experienceForm.controls['months'].setValue(25);
				//this.experienceForm.setValue({months:25});
			}
			return null;
		};
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

	private updateSemWiseMarks(semesterwisemarks: any) {
		// get our semesterwisemarks group controll
		
		

		let gradeErr = false; 
		//console.error("empty grade marks"+control);
		for (let i in semesterwisemarks) {
			console.error("hello: "+this.qualificationForm['semester']);
		//	const control = <FormArray>this.qualificationForm.get('semesterwisemarks').controls[i].get('questions');

		  let semName = semesterwisemarks[i].semester;
		  let semMarks = semesterwisemarks[i].marks;
		  let semGrade = semesterwisemarks[i].grade;
		  if(semName!= '' && (semGrade == '' || semGrade == null || semMarks == '' || semMarks == null) ){
			console.error("empty grade marks");
			this.semErrFlag = true;
			this.semErrMsg = "Please fill Marks / Grade.";
		  }
		  
		  // now format total price with angular currency pipe
		  
		}
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
				console.log("coursesdata"+this.coursesdata);
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
			console.log("Trying to update data");
			this.showMessage('processing','msg003','');
			this.applicationService.updatequalification(this.applicationid, qualificationForm.value).then((res)=>{
				console.log(res);
				this.showMessage('success','msg009','');
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
			this.applicationService.savequalification(this.applicationid, qualificationForm.value).then((res)=>{

				console.log('successfully inserted data');
				this.showMessage('success','msg008','');
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