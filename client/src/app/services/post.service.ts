import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  constructor(private http: Http) { }


  getposts(){
    
  	return new Promise((resolve, reject) => {
      this.http.get('/api/posts')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
