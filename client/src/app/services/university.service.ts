import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UniversityService {

 constructor(private http: Http) { }

 getuniversities(){
  	return new Promise((resolve, reject) => {
      this.http.get('/api/universities',null)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}