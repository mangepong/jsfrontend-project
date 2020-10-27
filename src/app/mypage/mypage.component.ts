import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MypageService } from '../mypage/mypage.service';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

    username: any;
    funds: any;
    objects: any;
    loading = false;
    submitted = false;

    constructor(
        private accountService: HomeService,
        private myService: MypageService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }


    ngOnInit() {
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
            // this.form = this.formBuilder.group({
            // });
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

        var name = JSON.parse(localStorage.getItem('name'));
        this.myService.getObjects(name.data.username)
            .subscribe((data) => {
                this.objects = data;
        });
    }

    onSubmit(name) {
        console.log("ASDASD");
        this.submitted = true;


        this.myService.deleteObjects(name)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['../home'], { relativeTo: this.route });
                },
                error: error => {
                    this.loading = false;
                    console.log("De gick skit");
                }
            });
    }
}
