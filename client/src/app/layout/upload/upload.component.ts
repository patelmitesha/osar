import { Component, OnInit,ViewEncapsulation,OnDestroy, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UploadService } from  '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	private sub: any;
	id: number;
	uploadForm: FormGroup; 
	UserImageFile:File;

	@ViewChild('UserImage',{static:false}) User_Image;
  constructor(
  	private router: ActivatedRoute, 
  	private uploadService: UploadService,
  	private formBuilder: FormBuilder) 
	{
		this.sub = this.router.params.subscribe(params => {
		this.id = params.id; // (+) converts string 'id' to a number
		console.log("Row ID from param : "+this.id);

		this.uploadForm = this.formBuilder.group({
		   	'_id':[this.id, Validators.required],
		   	'doctype': ['photo' ,Validators.required],
		   	'UserImage': ['', Validators.required]
		   });
		});
	}

	ngOnInit() {
		console.log("Inside on init personal info component");
	}

	upload(uploadForm){
		console.log(uploadForm);
		console.log(uploadForm._id);
		console.log('Doc Type : '+uploadForm.doctype);
		console.log('User Image : '+uploadForm.UserImage);
		console.log('User Image 1 : '+JSON.stringify(this.User_Image));

		const Image = this.User_Image.nativeElement;
		console.log(Image);
		if(Image.files && Image.files[0]){
			this.UserImageFile = Image.files[0];
		}

		const ImageFile:File = this.UserImageFile;

		const formData:FormData = new FormData();
		formData.append('type',uploadForm.doctype);
		formData.append('UserImage',ImageFile);

		this.uploadService.upload(formData).then((res)=>{
			//this.applicationForm = this.formBuilder.group(res);
			//this.applicationForm.setValue(res);
			//this.applicationForm.patchValue(res);
			console.log('Success upload component');
			console.log(res);
		},(err)=>{
			console.log('failure upload component');
			console.log(JSON.stringify(err));
			//this.applicationForm="Error";
		});
	}

	// onFileChange(event){
	// 	let reader = new FileReader();
	// 	if(event.target.files && event.target.files.length > 0){
	// 		let file = event.target.files[0];
	// 		reader.readAsDataURL(file);
	// 		reader.onload = () => {
	// 			this.uploadForm.get('UserImage').setValue({
	// 				filename: file.name, filetype: file.type,
	// 				value: reader.result.split(',')[1]
	// 			})
	// 		}
	// 	}
	// }
}
