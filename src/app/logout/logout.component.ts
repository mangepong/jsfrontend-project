import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private accountService: LoginService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      this.accountService.logout();
      this.router.navigate(['/'], { relativeTo: this.route });
  }

}
