import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationService {

  constructor(private http: Http) { }

  getapplication(applicationid) {

   let header=new Headers();
      header.append('x-access-token',localStorage.getItem("token"));
      let opts = new RequestOptions({headers:header, params: {_id:applicationid}});
      opts.headers=header;

    return new Promise((resolve, reject) => {
      this.http.get('/api/privateapi/application',opts)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getapplications() {
    return new Promise((resolve, reject) => {
      let header=new Headers();
      header.append('x-access-token',localStorage.getItem("token"));
      let opts = new RequestOptions();
      opts.headers=header;
      this.http.get('/api/privateapi/applications',opts)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveapplication(application) {
    console.log("Inside insert new data function");
    console.log("Application : "+application);
    let header=new Headers();
      header.append('x-access-token',localStorage.getItem("token"));
      let opts = new RequestOptions({headers:header});

    return new Promise((resolve, reject) => {
      this.http.post('/api/privateapi/application',application,opts)
        .map(res => res.json())
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
  }


  updateapplication(application) {

    console.log("Inside update application Application ID : "+ application._id);
    let header=new Headers();
      header.append('x-access-token',localStorage.getItem("token"));
      let opts = new RequestOptions({headers:header});

    return new Promise((resolve, reject) => {
      this.http.put('/api/privateapi/application',application,opts)
        .map(res => res.json())
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
  }



  saveexperience(applicationid,experience) {


    console.log("Inside insert new data function");
    console.log("Application : "+experience);
    let header=new Headers();
      header.append('x-access-token',localStorage.getItem("token"));
      let opts = new RequestOptions({headers:header, params: {_id:applicationid}});

    return new Promise((resolve, reject) => {
      this.http.post('/api/privateapi/experience',experience,opts)
        .map(res => res.json())
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
  }



  deleteexperience(applicationid,experienceid) {
    console.log("Inside insert new data function");
    console.log("Application ID : "+applicationid);
    console.log("Experience ID : "+experienceid);
    let header=new Headers();
      header.append('x-access-token',localStorage.getItem("token"));
      let opts = new RequestOptions({headers:header, params: {_id:applicationid, experienceid:experienceid}});

    return new Promise((resolve, reject) => {
      this.http.delete('/api/privateapi/experience',opts)
        .map(res => res.json())
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
  }


  updateexperience(applicationid, experience) {

    console.log("Inside update experience Application ID : "+ applicationid);
    let header=new Headers();
    header.append('x-access-token',localStorage.getItem("token"));
    let opts = new RequestOptions({headers:header, params: {_id:applicationid}});

    return new Promise((resolve, reject) => {
      this.http.put('/api/privateapi/experience',experience,opts)
        .map(res => res.json())
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
  }



  savequalification(applicationid,qualification) {

    console.log("Inside insert new qualification data function");
    console.log("qualification : "+qualification);
    let header=new Headers();
      header.append('x-access-token',localStorage.getItem("token"));
      let opts = new RequestOptions({headers:header, params: {_id:applicationid}});

    return new Promise((resolve, reject) => {
      this.http.post('/api/privateapi/qualification',qualification,opts)
        .map(res => res.json())
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
  }



  deletequalification(applicationid,qualificationid) {
    console.log("Inside delete qualification data function");
    console.log("Application ID : "+applicationid);
    console.log("Experience ID : "+qualificationid);
    let header=new Headers();
      header.append('x-access-token',localStorage.getItem("token"));
      let opts = new RequestOptions({headers:header, params: {_id:applicationid, qualificationid:qualificationid}});

    return new Promise((resolve, reject) => {
      this.http.delete('/api/privateapi/qualification',opts)
        .map(res => res.json())
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
  }


  updatequalification(applicationid, qualification) {

    console.log("Inside update qualification Application ID : "+ applicationid);
    let header=new Headers();
    header.append('x-access-token',localStorage.getItem("token"));
    let opts = new RequestOptions({headers:header, params: {_id:applicationid}});

    return new Promise((resolve, reject) => {
      this.http.put('/api/privateapi/qualification',qualification,opts)
        .map(res => res.json())
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
  }

  generatePaymentRequest(applicationid) {

    console.log("Inside update qualification Application ID : "+ applicationid);
    let header=new Headers();
    header.append('x-access-token',localStorage.getItem("token"));
    let opts = new RequestOptions({headers:header, params: {_id:applicationid}});

    return new Promise((resolve, reject) => {
      this.http.post('/api/privateapi/paymentrequest',applicationid,opts)
        .map(res => res.json())
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
  }


}