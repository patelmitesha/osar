import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs';
import { LoginService } from  '../services/login.service';
import { AdvertisementService } from  '../services/advertisement.service';
import { PostService } from  '../services/post.service';
import { SubjectService } from  '../services/subject.service';
import { Router } from '@angular/router'
import { MaterialModule } from '../material.module';

import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {

  loginData:any;
  hidepassowrd : boolean;
  loggingin:boolean;
  loginerror:any;
  advertisements:any;
  posts:any;
  subjects:any;
  processing:boolean;


  constructor(
    private router: Router, 
    private loginService: LoginService, 
    private advertisementService: AdvertisementService,
    private postService: PostService,
    private subjectService: SubjectService,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.hidepassowrd=true;
    this.loggingin=false;
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
              // this.getapplications();
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

  tryLogin(myForm){
    this.loggingin=true;
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 10000;

    this.loginService.login(myForm.value).then((res)=>{
    	this.loginData=res; console.log(this.loginData);	 

    	this.router.navigate(['layout/dashboard']);	  
    },(err) => {
        
        this.loginData="Error";  
        console.log(err._body);
        var errordetails=JSON.parse(err._body);
        this.loginerror=errordetails.errors[0].code;
        this.snackBar.open("Error : " + errordetails.errors[0].message,undefined,config);
      });

    this.loggingin=false;
  }
}