import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MypageService {

  constructor(
      private router: Router,
      private http: HttpClient
  ) { }

    getObjects(name) {
        return this.http.post(`https://project-api.mangepongjs.me/myobjects`, {name: name})
            .pipe(map(object => {
                return object;
            }));
    }

    deleteObjects(name) {
          return this.http.post(`https://project-api.mangepongjs.me/delete`, {name: name});
    }
}
