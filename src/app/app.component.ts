import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {KorisnikInfo} from "./korisnikInfo";
import {KorisnikService} from "./korisnik-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Upisi.se';
  login = false;

  constructor(private router: Router, private korisnikService: KorisnikService) {
  }

  korisnik: KorisnikInfo = {
    ime: '',
    prezime: '',
    jmbag: '',
    nazivStudija: '',
    nazivSmjera: '',
    semestar: 0
  }

  ngOnInit(): void {
    this.dohvatiKorisnikInfo();
    this.login = this.isLogin();
  }


  isLogin(): boolean {
    return this.router.url === '/' || this.router.url === '/login';
  }

  isPregledUpisa(): boolean {
    return this.isLogin() || this.router.url === '/pregled-upisa';
  }

  dohvatiKorisnikInfo(): void {
    this.korisnikService.dohvatiKorisnikInfo()
      .subscribe(korisnik => {
        if (korisnik != null) {
          this.korisnik = korisnik;
        }
        console.log(korisnik);
      }, error => {
        console.log(error);
      });
  }

  isStudent(): boolean {
    return sessionStorage.getItem('rola') === 'STUDENT';
  }

  odjaviKorisnika(): void {
    sessionStorage.clear();
  }
}
