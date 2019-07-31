import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseconfigService {

 constructor(private http: Http) { }


    getcourseconfigs(advertisementno, postcode, subjectcode){

      let header=new Headers();
      let opts = new RequestOptions({headers:header, params: {advertisementno:advertisementno, postcode:postcode,subjectcode:subjectcode}});
      opts.headers=header;

    	return new Promise((resolve, reject) => {
        this.http.get('/api/courseconfigs',opts)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }


    getcourseconfig(courseconfigid){
      let header=new Headers();
      let opts = new RequestOptions({headers:header, params: {courseconfigid:courseconfigid}});
      opts.headers=header;
      return new Promise((resolve, reject) => {
        this.http.get('/api/courseconfig',opts)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }

    getnotfilledcourseconfigs(applicationid){
    return new Promise((resolve, reject) => {




   let header=new Headers();
      header.append('x-access-token',localStorage.getItem("token"));
      let opts = new RequestOptions({headers:header, params: {_id:applicationid}});
      opts.headers=header;

      this.http.get('/api/privateapi/courseconfigs/remaining',opts)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}







