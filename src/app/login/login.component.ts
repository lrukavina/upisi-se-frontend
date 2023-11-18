import {Component} from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private route: Router
  ) {
  }

  prijavaKorisnika(korisnickoIme: string, lozinka: string): void {
    korisnickoIme = korisnickoIme.trim();
    lozinka = lozinka.trim();

    this.loginService.autentikacijaKorisnika({korisnickoIme: korisnickoIme, lozinka: lozinka}).subscribe(korisnik => {
      sessionStorage.setItem('token', korisnik.token);
      sessionStorage.setItem('korisnickoIme', korisnik.korisnickoIme);
      sessionStorage.setItem('rola', korisnik.rola);
      sessionStorage.setItem('refresh', '1');
      this.route.navigate(['/pregled-upisa']);
    }, error => {
      console.log(error);
    });
  }
}
