import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-semesterwisemarks',
  templateUrl: './semesterwisemarks.component.html',
  styleUrls: ['./semesterwisemarks.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SemesterwisemarksComponent implements OnInit {

  private sub: any;
  public id: string;
  public semwisemarksid: string;
  public qualificationid: string;
  public mode: string;
  application: any;

  semWiseMarksForm: FormGroup;
  validationError: any;

  processing: boolean;
  showSpinner: boolean;
  msgCode: String;
  msgDetails: String;
  showMsg: boolean;
  msgIcon: String;


  constructor(private router: ActivatedRoute, private applicationService: ApplicationService, private formBuilder: FormBuilder) {
    this.processing = false;
    this.showSpinner = false;
    this.showMsg = false;
  }

  ngOnInit() {

    this.mode = 'new';
 
    console.log("Inside on init semester wise marks component");
    this.sub = this.router.params.subscribe(params => {
      this.id = params.id; // (+) converts string 'id' to a number
      console.log("Row ID from param : " + this.id);
      this.qualificationid = params.qualificationid;
      console.log("param qualificationid : "+this.qualificationid);
      this.semwisemarksid = params.semwisemarksid;
      console.log("semwisemarksid ID from param : " + this.semwisemarksid);
      if (this.semwisemarksid) {
        this.mode = 'edit';
      }

      this.semWiseMarksForm = this.formBuilder.group({
        _id: [],
        semester: [undefined, [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9 .,-]+$')]],
        marks: [undefined, [Validators.required, Validators.pattern('^[0-9 .]+$')]],
        grade: [undefined, [Validators.required, Validators.pattern('^[a-zA-Z0-9 .,+-]+$')]]

      });

      if (this.mode == 'edit') {
        console.log('Inside edit');
        this.getsemwisemarks(params.id,params.qualificationid, params.semwisemarksid);
      }


    });

  }


  addSemWiseMarks(semWiseMarksForm) {


    console.log(semWiseMarksForm);
    if (semWiseMarksForm.value._id) {
      //update
      console.log("Trying to update data");
      this.showMessage('processing', 'msg003', '');
      this.applicationService.updatesemwisemarks(this.id, semWiseMarksForm.value).then((res) => {
        console.log(res);
        this.showMessage('success', 'msg011', '');
      }, (err) => {
        this.clearMessage();
        console.log("Error occured: " + err.status);
        console.log(err);
        if (err.status == 0) {
          this.showMessage('error', 'err0011', '');
        } else {
          if (err._body) {
            try {
              var error = JSON.parse(err._body);
              if (error) {
                // for (var field in error.errors) {
                // 	console.log('err : '+field);
                // }
                console.log('error : ');

                if (err.status == 422) {
                  console.log('inside 422');
                  console.log(error);
                  this.validationError = error.errors;
                  this.showMessage('error', 'err0010', error);
                }
              }
            } catch (e) {
              console.log(e);
              this.showMessage('error', 'err006', e);
            }

            // console.log(error);

          } else {
            if (err.status === 0) {
              console.log('Network error');
              this.showMessage('error', 'err0011', 'Unable to connect');
            } else {
              console.log("Status : " + err.status);
              this.showMessage('error', 'err006', err);
            }

          }
        }


      });
    } else {


      this.clearMessage();

      console.log("Trying to insert new semWiseMarks");
      this.applicationService.savesemwisemarks(this.id,this.qualificationid, semWiseMarksForm.value).then((res) => {

        console.log('successfully inserted data');
        this.showMessage('success', 'msg010', '');
      }, (err) => {

        if (err._body) {
          var error = JSON.parse(err._body);
          console.log(error);
          if (error) {
            /*for (var field in err.errors) {
    console.log('var names : '+field.message);
    }*/

            if (err) {
              if (err.status == 422) {
                console.log('While inserting validation Error occured');
                this.validationError = err._body;
                this.showMessage('error', 'err010', '');
              } else {
                this.validationError = null;
                this.showMessage('error', 'err006', err);
              }
            }

          }
        } else {
          this.showMessage('error', 'err006', err);
        }

        this.processing = true;
        //this.validationError=err._body;
        console.log("Error Response :" + err);
        console.log("Error of subjectcode : " + err._body.errors);
      });
    }



  }

  ngOnDestroy() {
		this.sub.unsubscribe();
  }
  
  getsemwisemarks(applicationid, qualificationid, semwisemarksid){
		console.log('inside getsemwisemarks');
		console.log("Application ID : "+applicationid);

		var isSemwisemarksFound:boolean;
		isSemwisemarksFound=false;

		this.applicationService.getapplication(applicationid).then((res)=>{
			this.application=res;
			//this.experienceForm.patchValue(res);
			for(let qualification of this.application.qualifications){
				console.log('qualification : ');
				console.log(qualification);
				if(qualification._id==qualificationid){
          console.log('qualification Details : '+qualification);
          

          for(let semesterwisemark of qualification.semesterwisemarks){
            console.log('semesterwisemark : ');
            console.log(semesterwisemark);
            if(semesterwisemark._id==semwisemarksid){
              console.log('semesterwisemark Details : '+semesterwisemark);
              this.semWiseMarksForm.patchValue(semesterwisemark);
              isSemwisemarksFound=true;
              break;
            }
          }

				}
			}
			if(isSemwisemarksFound){
				console.log('Semwisemarks found');	
			}else{
				console.log('Semwisemarks not found');
			}
			
			console.log(res);
		},(err)=>{
			console.log('Error while getting Semwisemarks');
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
