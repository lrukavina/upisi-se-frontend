import {Component} from '@angular/core';
import {PregledKolegijaService} from "./pregled-kolegija.service";
import {KolegijPregled} from "../common/kolegijPregled";
import {SifraOpis} from "../common/sifraOpis";
import {KolegijInfo} from "../common/kolegijInfo";
import {Nastavnik} from "../common/nastavnik";

@Component({
  selector: 'app-pregled-kolegija',
  templateUrl: './pregled-kolegija.component.html',
  styleUrls: ['./pregled-kolegija.component.css']
})
export class PregledKolegijaComponent {

  modalOtvoren = false;
  modalEditOtvoren = false;
  modalBrisanjeOtvoren = false;

  kolegiji: KolegijPregled[] = [];
  kolegijiPrikaz: KolegijPregled[] = [];

  sifraOpis: SifraOpis = {
    sifra: '',
    opis: ''
  }

  kolegijInfo: KolegijInfo = {
    sifra: '',
    informacije: '',
    kolegij: this.sifraOpis
  }

  nastavnici: Nastavnik[] = [];

  kolegij: KolegijPregled = {
    naziv: '',
    ects: 0,
    semestar: 0,
    isvuSifra: '',
    obavezan: false,
    studij: this.sifraOpis,
    visokoUciliste: this.sifraOpis,
    kolegijInfo: this.kolegijInfo,
    nastavnici: this.nastavnici
  }

  constructor(private pregledKolegijaService: PregledKolegijaService) {
  }

  ngOnInit(): void {
    this.dohvatiKolegije();
  }

  dohvatiKolegije(): void {
    this.pregledKolegijaService.dohvatiKolegije()
      .subscribe(kolegiji => {
        this.kolegiji = kolegiji;
        this.kolegijiPrikaz = kolegiji;
        console.log(kolegiji);
      }, error => {
        console.log(error);
      });
  }

  pretrazi(): void {
    let inputPolje = document.getElementById('pretraga') as HTMLInputElement;
    let str = inputPolje.value;

    this.kolegijiPrikaz = this.kolegiji;

    this.kolegijiPrikaz = this.kolegiji.filter(kolegij =>
      kolegij.naziv.toLowerCase().includes(str.toLowerCase()) ||
      kolegij.semestar.toString().toLowerCase().includes(str.toLowerCase()) ||
      kolegij.ects.toString().toLowerCase().includes(str.toLowerCase()) ||
      kolegij.visokoUciliste.opis.toLowerCase().includes(str.toLowerCase()) ||
      kolegij.studij.opis.toLowerCase().includes(str.toLowerCase())
    );
  }
}
