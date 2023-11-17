import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Upisi.se';
  login = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.login = this.isLogin();

  }

  isLogin(): boolean {
    return this.router.url === '/' || this.router.url === '/login';
  }

  isPregledUpisa(): boolean {
    return this.isLogin() || this.router.url === '/pregled-upisa'
  }

}
