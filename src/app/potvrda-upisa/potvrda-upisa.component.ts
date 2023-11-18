import {Component, OnInit} from '@angular/core';
import {PotvrdaUpisaService} from "./potvrda-upisa.service";
import {OdabraniKolegijPregled} from "../common/odabraniKolegijPregled";
import {UpisniList} from "../common/upisniList";
import {SifraOpis} from "../common/sifraOpis";

@Component({
  selector: 'app-potvrda-upisa',
  templateUrl: './potvrda-upisa.component.html',
  styleUrls: ['./potvrda-upisa.component.css']
})
export class PotvrdaUpisaComponent implements OnInit {

  constructor(private potvrdaUpisaService: PotvrdaUpisaService) {
  }

  sifraOpis: SifraOpis = {
    sifra: '',
    opis: ''
  }

  odabraniKolegijiPregled: OdabraniKolegijPregled[] = [];

  upisniList: UpisniList = {
    sifra: '',
    brojEctsa: 0,
    cijenaPoEctsu: '',
    ukupnaCijena: '',
    upisniBroj: '',
    status: '',
    upisSifra: '',
    korisnikSifra: '',
    korisnik: this.sifraOpis,
    odabraniKolegiji: this.odabraniKolegijiPregled
  }

  ngOnInit(): void {
    this.dohvatiUpisniList();
  }

  dohvatiUpisniList(): void {
    this.potvrdaUpisaService.dohvatiUpisniList()
      .subscribe(upisniList => {
        this.upisniList = upisniList;
        console.log(upisniList);
      }, error => {
        console.log(error);
      });
  }


}
