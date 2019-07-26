import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
 constructor(private http: Http) { }

 login(form) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/login',form)
        .map(res => res.json())
        .subscribe(res => {

         this.saveToken(res.token);
      
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  register(form) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/register',form)
        .map(res => res.json())
        .subscribe(res => {
          
          this.saveToken(res.token);

          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout(){

      localStorage.clear();
      return true;
    
  }


  isLoggedIn() {
      var token = this.getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = atob(payload);
        //alert(payload);
        payload = JSON.parse(payload);
//alert("payload 1 : " +payload.email);
        alert("payload 1 : " +payload._id);
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

     saveToken (token) {
       return new Promise((resolve, reject) => {
      localStorage.setItem('token', token);
    });
      
    };

  getToken() {
    return localStorage.getItem('token');
  };

  verify(form) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/verify',form)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}