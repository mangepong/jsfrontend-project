import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    login(email, password) {
          return this.http.post(`http://localhost:1337/login`, {email: email, password: password})
              .pipe(map(user => {
                  localStorage.setItem('user', JSON.stringify(user));
                  return user;
              }));
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }


}
