import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    username: any;

    constructor(
        private accountService: HomeService, private route: ActivatedRoute, private router: Router
    ) { }

    ngOnInit() {

        if (!localStorage.getItem("user")) {
            alert("You need to login first!");
            this.router.navigate(['/login']);
        }

        var user = JSON.parse(localStorage.getItem('user'));

        this.accountService.getUsername(user.email)
            .subscribe((data) => {
                console.log(data);
                this.username = data;
            });
    }

}
