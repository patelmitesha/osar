import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdvertisementService {

  constructor(private http: Http) { }

getadvertisements() {
    return new Promise((resolve, reject) => {
      this.http.get('/api/advertisements',null)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



}


