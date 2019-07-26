import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StateService {

 constructor(private http: Http) { }

  getstates(){
  	return new Promise((resolve, reject) => {
      this.http.get('/api/states',null)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
