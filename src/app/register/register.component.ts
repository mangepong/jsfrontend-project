import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: RegisterService
    ) {}

    ngOnInit() {

        if (!localStorage.getItem("user")) {
            var logout = document.getElementById("logout");
            var logout2 = document.getElementById("logout2");
            logout.style.display = "None";
            logout2.style.display = "None";
        } else {
            var login3 = document.getElementById("login3");
            var login2 = document.getElementById("login2");
            var login = document.getElementById("login");
            login3.style.display = "None";
            login2.style.display = "None";
            login.style.display = "None";
        }

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value.email, this.form.value.password, this.form.value.name)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.loading = false;
                    console.log("De gick skit");
                }
            });
    }
}
