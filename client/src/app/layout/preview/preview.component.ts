import { Component, OnInit,ViewEncapsulation,OnDestroy } from '@angular/core';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { MaterialModule } from '../../material.module';


import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';


import { ApplicationService } from  '../../services/application.service';
import { CourseconfigService } from  '../../services/courseconfig.service';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PreviewComponent implements OnInit {
 	
 	private sub: any;
 	id: number;
 	application : any;
  remainingCourses: any;

  constructor(
    private router: ActivatedRoute,
    private applicationService: ApplicationService,
    private courseconfigService: CourseconfigService,
    public snackBar: MatSnackBar ) { }

  ngOnInit() {
    

  	this.sub = this.router.params.subscribe(params => {
       this.id = params.id; // (+) converts string 'id' to a number
       console.log("Row ID from param : "+this.id);
       // In a real app: dispatch action to load the details here.

       this.getapplication(this.id);
    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


	getapplication(applicationid){
	this.applicationService.getapplication(applicationid).then((res)=>{
	    this.application=res;
      console.log('ApplicationID from service :'+this.application._id);
      console.log('calling getnotfilledcourseconfigs');
      this.getnotfilledcourseconfigs(this.application._id);
	  },(err)=>{
      console.log(err);
	    this.application="Error";
	  });
	}

  getnotfilledcourseconfigs(applicationno){
    console.log('Not filled course config for Application No : '+applicationno);
    this.courseconfigService.getnotfilledcourseconfigs(this.application._id).then((res)=>{
      this.remainingCourses=res;
    },(err)=>{
      this.remainingCourses="Error";
    });

  }

  deleteexperience(applicationid,experienceid){
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 10000;

    console.log('Removing experience with ID : '+experienceid);
    
    this.applicationService.deleteexperience(applicationid,experienceid).then((res)=>{

      for(let experience of this.application.experiences){
        if(experience._id==experienceid){
          this.application.experiences.splice(this.application.experiences.indexOf(experience),1);
          break;
        }
      }

      this.snackBar.open('Experience Deleted Successfully',undefined,config);
    },(err)=>{
      console.log(err);
      this.snackBar.open('Error while deleting experience',undefined,config);
    });
  }

  deletequalification(applicationid,qualificationid){
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 10000;

    console.log('Removing qualification with ID : '+qualificationid);
    
    this.applicationService.deletequalification(applicationid,qualificationid).then((res)=>{

      for(let qualification of this.application.qualifications){
        if(qualification._id==qualificationid){
          this.application.qualifications.splice(this.application.qualifications.indexOf(qualification),1);
          break;
        }
      }

      this.getnotfilledcourseconfigs(applicationid);

      this.snackBar.open('Qualification Deleted Successfully',undefined,config);
    },(err)=>{
      console.log(err);
      this.snackBar.open('Error while deleting Qualification',undefined,config);
    });
  }


}
