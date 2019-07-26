import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class UploadService {

	constructor(private http: Http) { }



	upload(uploadForm){
		console.log('Inside upload form service');
		//console.log(uploadForm);
		let header=new Headers();
		//header.append('x-access-token',localStorage.getItem("token"));
		//header.append('Content-Type','multipart/form-data');
		 let opts = new RequestOptions({headers:header});
		//   let formData=new FormData();
		 // formData.append('file',uploadForm);
		   // formData.append('UserImage', "{ value: 'fs.createReadStream('/home/mitesh/Desktop/APAR-2017.docx')', options: { filename: '/home/mitesh/Desktop/APAR-2017.docx', contentType: null } }, option: 'test' } ");


		console.log('Inside upload service');

		return new Promise((resolve, reject) => {
			this.http.post('/api/upload',uploadForm,opts)
		    .map(res => res.json())
		    .subscribe(res => {
		    	console.log('Upload service success response');
		      resolve(res);
		    }, (err) => {
		    	console.log('Upload service error response');
		      reject(err);
		    });
		});
	}
}

