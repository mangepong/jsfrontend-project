import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import * as io from "socket.io-client";
import { HomeService } from '../home/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const SOCKET_ENDPOINT = 'https://project-api.mangepongjs.me';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

    username: any;
    funds: any;
    objects: any;
    form: FormGroup;
    loading = false;
    submitted = false;
    socket;

    constructor(
        private accountService: HomeService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ) { }


    ngOnChanges() {
        this.setupSocketConnection();
    }


    ngOnInit() {
        this.setupSocketConnection();

        if (!localStorage.getItem("user")) {
            this.router.navigate(['/login']);
            alert("You need to login first!");
        } else {
            var login3 = document.getElementById("login3");
            var login2 = document.getElementById("login2");
            var login = document.getElementById("login");
            login3.style.display = "None";
            login2.style.display = "None";
            login.style.display = "None";

            var user = JSON.parse(localStorage.getItem('user'));

            this.accountService.getUsername(user.email)
            .subscribe((data) => {
                localStorage.setItem('name', JSON.stringify(data));
            });
        }

        var user = JSON.parse(localStorage.getItem('user'));

        this.accountService.getUsername(user.email)
            .subscribe((data) => {
                this.username = data;
        });
        this.accountService.getFunds(user.email)
            .subscribe((data) => {
                this.funds = data;
        });


        this.form = this.formBuilder.group({

        });
    }

    get f() { return this.form.controls; }


    onSubmit(buyer, name, objectname, price, deposit) {
        this.setupSocketConnection();
        console.log("PRESSED");
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }


        this.loading = true;

        this.accountService.buyObjects(buyer, name, objectname, price, deposit)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.setupSocketConnection();
                    this.router.navigate(['../mypage'], { relativeTo: this.route });
                },
                error: error => {
                    this.loading = false;
                    console.log("De gick skit");
                }
            });

    }


    setupSocketConnection() {
        console.log("SOCKET");
        this.socket = io(SOCKET_ENDPOINT);
        this.socket.emit('message', 'Hello there from Angular.');
        this.socket.on('broadcast', (data: string) => {
            this.objects = data;
        });

    }
}
