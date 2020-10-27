import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CreateObjectService } from './create-object.service';
import { HomeService } from '../home/home.service';


@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private createService: CreateObjectService,
        private homeService: HomeService
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
            this.homeService.getUsername(user.email)
            .subscribe((data) => {
                localStorage.setItem('name', JSON.stringify(data));
            });
        }


        this.form = this.formBuilder.group({
            objname: ['', Validators.required],
            price: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        console.log(this.form.value.objname);
        if (this.form.invalid) {
            return;
        }


        var name = JSON.parse(localStorage.getItem('name'));

        this.loading = true;
        this.createService.create(name.data.username, this.form.value.objname, this.form.value.price)
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
