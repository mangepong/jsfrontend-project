import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: LoginService,
    ) { }

    ngOnInit() {
        if (!localStorage.getItem("user")) {
            var logout = document.getElementById("logout");
            var logout2 = document.getElementById("logout2");
            var logout3 = document.getElementById("logout1");
            var login3 = document.getElementById("login3");
            var login2 = document.getElementById("login2");
            var login = document.getElementById("login");
            // logout.style.display = "None";
            // logout2.style.display = "None";
            // logout3.style.display = "None";
            login3.style.display = "None";
            login2.style.display = "None";
            login.style.display = "None";
        } else {
            this.router.navigate(['/home'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
            var logout = document.getElementById("logout");
            var logout2 = document.getElementById("logout2");
            var logout3 = document.getElementById("logout1");
            var login3 = document.getElementById("login3");
            var login2 = document.getElementById("login2");
            var login = document.getElementById("login");
            logout.style.display = "None";
            logout2.style.display = "None";
            logout3.style.display = "None";
            login3.style.display = "None";
            login2.style.display = "None";
            login.style.display = "None";
        }

        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }


    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/home'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
                },
                error: error => {
                    alert("Wrong password or email!");
                    this.loading = false;
                }
            });
    }
}
