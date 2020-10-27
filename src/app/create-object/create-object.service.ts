import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateObjectService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    create(name, objectname, price) {
        return this.http.post(`https://project-api.mangepongjs.me/create`, {name: name, objectname: objectname, price: price});
    }
}
