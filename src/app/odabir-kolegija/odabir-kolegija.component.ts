import {Component} from '@angular/core';
import {SifraOpis} from "../common/sifraOpis";
import {Kolegij} from "../common/kolegij";
import {Upis} from "../pregled-upisa/upis";
import {PregledUpisaService} from "../pregled-upisa/pregled-upisa.service";
import {OdabirKolegijaService} from "./odabir-kolegija.service";
import {KolegijPregled} from "../common/kolegijPregled";
import {KolegijInfo} from "../common/kolegijInfo";
import {Nastavnik} from "../common/nastavnik";
import {OdabraniKolegij} from "../common/odabraniKolegij";
import {Router} from "@angular/router";

@Component({
  selector: 'app-odabir-kolegija',
  templateUrl: './odabir-kolegija.component.html',
  styleUrls: ['./odabir-kolegija.component.css']
})
export class OdabirKolegijaComponent {
  modalOtvoren = false;
  aktivniTab = 'osnovneInformacije';

  sifraOpis: SifraOpis = {
    sifra: '',
    opis: ''
  }

  kolegij: Kolegij = {
    sifra: '',
    opis: '',
    semestar: 0,
    ects: 0
  }

  kolegiji: Kolegij[] = [];

  upis: Upis = {
    sifra: '',
    visokoUciliste: this.sifraOpis,
    studij: this.sifraOpis,
    semestar: 0,
    minBrojEctsa: 0,
    maxBrojEctsa: 0,
    datumVrijemeOd: '',
    datumVrijemeDo: '',
    status: '',
    obavezniKolegiji: this.kolegiji,
    izborniKolegiji: this.kolegiji
  }

  kolegijInfo: KolegijInfo = {
    sifra: '',
    informacije: '',
    kolegij: this.sifraOpis
  }

  nastavnici: Nastavnik[] = [];

  kolegijPregled: KolegijPregled = {
    naziv: '',
    ects: 0,
    semestar: 0,
    isvuSifra: '',
    obavezan: true,
    studij: this.sifraOpis,
    kolegijInfo: this.kolegijInfo,
    nastavnici: this.nastavnici
  }

  constructor(
    private pregledUpisaService: PregledUpisaService,
    private odabirKolegijaService: OdabirKolegijaService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.dohvatiAktivneUpise();
  }


  dohvatiAktivneUpise(): void {
    this.pregledUpisaService.dohvatiUpise()
      .subscribe(upis => {
        if (upis != null) {
          this.upis = upis;
        }
        console.log(upis);
      }, error => {
        console.log(error);
      });
  }

  dohvatiKolegijpregled(sifra: string): void {
    this.odabirKolegijaService.dohvatiKolegijPregled(sifra).subscribe(kolegijPregled => {
      if (kolegijPregled != null) {
        this.kolegijPregled = kolegijPregled;
      }
      console.log(kolegijPregled);
    }, error => {
      console.log(error);
    });
  }

  promijeniTab(tabId: any): void {
    this.odaberiTab(tabId);
    this.aktivniTab = tabId;

  }

  odaberiTab(tabId: any): void {
    let odabraniTab = document.getElementById(tabId);
    let tabovi = document.getElementsByClassName('tab');
    if (odabraniTab == null || tabovi == null) {
      return;
    }

    let taboviArr = Array.from(tabovi);
    taboviArr.forEach(tab => {
      tab.classList.remove('is-active');
    });

    odabraniTab.classList.add('is-active');
  }

  defaultTab(): void {
    this.aktivniTab = 'osnovneInformacije';
  }

  odaberiKolegije(): void {
    let odabraniKolegijiElement = document.getElementsByClassName('odabirKolegija');
    let odabraniKolegijiArr = Array.from(odabraniKolegijiElement);

    let kolegiji: string[] = [];

    const odabraniKolegiji: HTMLInputElement[] =
      odabraniKolegijiArr
        .filter((element) => element instanceof HTMLInputElement) as HTMLInputElement[];

    odabraniKolegiji.forEach(kolegij => {
      if (!kolegij.checked) {
        return;
      }
      kolegiji.push(kolegij.id);
    });

    let odabraneKolegijSifre: OdabraniKolegij = {
      kolegijSifre: kolegiji
    }

    this.odabirKolegijaService.azurirajKolegije(odabraneKolegijSifre).subscribe(odabraniKolegiji => {
      console.log(odabraniKolegiji);
    }, error => {
      console.log(error);
    });

    setTimeout(() => {
        this.route.navigate(['/potvrda-upisa']);
      },
      100);
  }
}
