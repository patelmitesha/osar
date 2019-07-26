import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs';
import { AdvertisementService } from  '../../services/advertisement.service';
import { ApplicationService } from  '../../services/application.service';
import { PostService } from  '../../services/post.service';
import { SubjectService } from  '../../services/subject.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

advertisements:any;
applications:any;
posts:any;
subjects:any;
processing:boolean;

  constructor(
    private router: Router, 
    private advertisementService: AdvertisementService,
    private applicationService: ApplicationService,
    private postService: PostService,
    private subjectService: SubjectService,
    ) { }

  ngOnInit() {
    this.processing=false;
  	this.advertisement();
    
  }


advertisement(){
  this.processing=true;
  this.postService.getposts().then((res)=>{
    this.posts=res;
    //getting subjects
    this.subjectService.getsubjects().then((res)=>{
      this.subjects=res;
      //getting advertisements
      this.advertisementService.getadvertisements().then((res)=>{
          this.advertisements=res;
            this.processing=false;

            // getting the applications
            this.getapplications();
        },(err)=>{
          this.advertisements="Error";
            this.processing=false;
        });
    },(err)=>{
      this.subjects="Error";
        this.processing=false;
    });


  },(err)=>{
    this.posts="Error";
      this.processing=false;
  });


	

}

advtStatus:any;
getapplications(){
  var advt=[];

  this.processing=true;
  this.applicationService.getapplications().then((res)=>{
    this.applications=res;

    for(let advertisement of this.advertisements){
      for(let advtdetails of advertisement.advertisementdetails){
        var status='new';
        var applicationid='';
        for(let application of this.applications){
          if((application.applicationno.substr(0,4) ==  advertisement.advertisementno) && 
            (application.applicationno.substr(4,2)==advtdetails.postcode) && 
            (application.applicationno.substr(6,2)==advtdetails.subjectcode)){
            status='applied';
            applicationid=application._id;
          }
        }
        var tmpStatus={
          advertisementno : advertisement.advertisementno,
          postcode:advtdetails.postcode,
          subjectcode : advtdetails.subjectcode,
          _id:applicationid,
          status : status
        };
        advt.push(tmpStatus);
      }


    }
    this.advtStatus=advt;
    console.log(this.advtStatus);
    this.processing=false;
  },(err)=>{
    this.applications="Error";
    this.processing=false;
  });
}



}




