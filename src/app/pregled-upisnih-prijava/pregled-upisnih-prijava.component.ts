import {Component} from '@angular/core';
import {SifraOpis} from "../common/sifraOpis";
import {PregledKolegijaService} from "../pregled-kolegija/pregled-kolegija.service";
import {PregledUpisaService} from "../pregled-upisa/pregled-upisa.service";
import {Upis} from "../pregled-upisa/upis";
import {Kolegij} from "../common/kolegij";

@Component({
  selector: 'app-pregled-upisnih-prijava',
  templateUrl: './pregled-upisnih-prijava.component.html',
  styleUrls: ['./pregled-upisnih-prijava.component.css']
})
export class PregledUpisnihPrijavaComponent {

  modalOtvoren = false;
  modalEditOtvoren = false;
  modalBrisanjeOtvoren = false;
  modalPregledOtvoren = false;

  upisi: Upis[] = [];
  upisiPrikaz: Upis[] = [];

  sifraOpis: SifraOpis = {
    sifra: '',
    opis: ''
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

  constructor(private pregledKolegijaService: PregledKolegijaService, private pregledUpisaService: PregledUpisaService) {
  }

  ngOnInit(): void {
    this.dohvatiUpise();
  }

  dohvatiUpise(): void {
    this.pregledUpisaService.dohvatiSveUpise()
      .subscribe(upisi => {
        this.upisi = upisi;
        this.upisiPrikaz = upisi;
        console.log(upisi);
      }, error => {
        console.log(error);
      });
  }

  dohvatiUpis(sifra: string): void {
    this.pregledUpisaService.dohvatiUpisPoSifri(sifra)
      .subscribe(upis => {
        this.upis = upis;
        console.log(upis);
      }, error => {
        console.log(error);
      });
  }
}
