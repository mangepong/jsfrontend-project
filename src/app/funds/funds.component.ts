import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FundsService } from '../funds/funds.service';
import { HomeService } from '../home/home.service';
@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;
    username: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: FundsService,
        private homeService: HomeService
    ) { }

    ngOnInit() {

        if (!localStorage.getItem("user")) {
            alert("You need to login first!");
            this.router.navigate(['/login']);
        } else {
            var login3 = document.getElementById("login3");
            var login2 = document.getElementById("login2");
            var login = document.getElementById("login");
            login3.style.display = "None";
            login2.style.display = "None";
            login.style.display = "None";
        }

        var user = JSON.parse(localStorage.getItem('user'));
        this.homeService.getUsername(user.email)
            .subscribe((data) => {
                this.username = data;
        });

        this.form = this.formBuilder.group({
              amount: ['', Validators.required]
        });

    }

    get f() { return this.form.controls; }


    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.accountService.addFunds(this.f.amount.value, this.username.data.username)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/home'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
                },
                error: error => {
                    alert("Could not add funds!");
                    this.loading = false;
                }
            });
    }
}
