import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomeService {


    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getUsername(email) {
          return this.http.post(`https://project-api.mangepongjs.me/username`, {email: email})
              .pipe(map(user => {
                  return user;
              }));
    }

    getFunds(email) {
          return this.http.post(`https://project-api.mangepongjs.me/funds`, {email: email})
              .pipe(map(user => {
                  return user;
              }));
    }

    getObjects(name) {
          return this.http.post(`https://project-api.mangepongjs.me/objects`, {name: name})
              .pipe(map(object => {
                  return object;
              }));
    }

    buyObjects(buyer, name, objectname, price, deposit) {
          return this.http.post(`https://project-api.mangepongjs.me/buy`, {buyer: buyer, name: name, objectname: objectname, price: price, deposit: deposit});
    }
}
