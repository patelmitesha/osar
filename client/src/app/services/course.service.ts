import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {

  constructor(private http: Http) { }

  getcourses(courseconfigid){
    let header=new Headers();
    let opts = new RequestOptions({headers:header, params: {courseconfigid:courseconfigid}});
    opts.headers=header;

  	return new Promise((resolve, reject) => {
      this.http.get('/api/courses',opts)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}










