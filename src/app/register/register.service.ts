import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    register(email, password, name) {
        return this.http.post(`https://project-api.mangepongjs.me/register`, {email: email, password: password, name: name});
    }
}
