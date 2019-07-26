import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SubjectService {

  constructor(private http: Http) { }

  getsubjects(){
    
  	return new Promise((resolve, reject) => {
      this.http.get('/api/subjects')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}



