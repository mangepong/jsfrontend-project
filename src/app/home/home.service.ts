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
          return this.http.post(`http://localhost:1337/username`, {email: email})
              .pipe(map(user => {
                  localStorage.setItem('username', JSON.stringify(user));
                  return user;
              }));
    }
}
