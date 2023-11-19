import {Component} from '@angular/core';
import {PregledKolegijaService} from "./pregled-kolegija.service";
import {KolegijPregled} from "../common/kolegijPregled";
import {SifraOpis} from "../common/sifraOpis";
import {KolegijInfo} from "../common/kolegijInfo";
import {Nastavnik} from "../common/nastavnik";
import {PregledStudenataService} from "../pregled-studenata/pregled-studenata.service";
import {KolegijZahtjev} from "../common/kolegijZahtjev";

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

  visokaUcilista: SifraOpis[] = [];
  studiji: SifraOpis[] = [];

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

  constructor(private pregledKolegijaService: PregledKolegijaService, private pregledStudenataService: PregledStudenataService) {
  }

  ngOnInit(): void {
    this.dohvatiKolegije();
    this.dohvatiVisokaUcilista();
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

  dohvatiVisokaUcilista(): void {
    this.pregledStudenataService.dohvatiVisokaUcilista()
      .subscribe(visokaUcilista => {
        this.visokaUcilista = visokaUcilista;
        this.visokaUcilista = visokaUcilista;
        console.log(visokaUcilista);
      }, error => {
        console.log(error);
      });
  }

  dohvatiStudije(): void {
    let visokoUcilisteSelect = document.getElementById('visokoUcilisteSelect') as HTMLInputElement;
    let studijSelect = document.getElementById('studijSelect') as HTMLInputElement;

    let visokoUcilisteSifra = visokoUcilisteSelect.value;

    if (visokoUcilisteSifra === '') {
      studijSelect.disabled = true;
      return;
    }

    studijSelect.disabled = false;
    this.pregledStudenataService.dohvatiStudije(visokoUcilisteSifra)
      .subscribe(studiji => {
        this.studiji = studiji;
        this.studiji = studiji;
        console.log(studiji);
      }, error => {
        console.log(error);
      });
  }

  dohvatiStudijeEdit(visokoUcilisteSifra: string): void {
    this.pregledStudenataService.dohvatiStudije(visokoUcilisteSifra)
      .subscribe(studiji => {
        this.studiji = studiji;
        this.studiji = studiji;
        console.log(studiji);
      }, error => {
        console.log(error);
      });
  }

  dodajNastavnika(): void {
    let nastavnikDiv = document.getElementById('nastavnici');
    if (nastavnikDiv == null) {
      return;
    }
    nastavnikDiv.innerHTML += `<div class="columns">
          <div class="column">
            <div class="field">
              <label class="label has-text-weight-medium has-text-centered">Titula</label>
              <div class="control">
                <input class="input titula" type="text" placeholder="dr.sc.">
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label has-text-weight-medium has-text-centered">Ime i prezime</label>
              <div class="control">
                <input class="input imePrezime" type="text" placeholder="Ivo Ivić">
              </div>
            </div>
          </div>
        </div>`
  }

  spremiKolegij(naziv: string,
                ects: string,
                semestar: string,
                isvuSifra: string,
                obavezan: string,
                studijSifra: string,
                informacije: string,
                isAzuriranje: boolean): void {

    naziv = naziv.trim();
    ects = ects.trim();
    semestar = semestar.trim();
    isvuSifra = isvuSifra.trim();
    studijSifra = studijSifra.trim();
    informacije = informacije.trim();

    let nastavniciTitule = document.getElementsByClassName('titula');
    let nastavniciImePrezime = document.getElementsByClassName('imePrezime');

    let nastavniciTituleArr = Array.from(nastavniciTitule) as any;
    let nastavniciImePrezimeArr = Array.from(nastavniciImePrezime) as any;

    let nastavnici: Nastavnik[] = [];

    for (let i = 0; i < nastavniciImePrezimeArr.length; i++) {
      let imePrezimeArr = nastavniciImePrezimeArr[i].value.split(' ');
      let nastavnik: Nastavnik = {
        sifra: '',
        ime: imePrezimeArr[0],
        prezime: imePrezimeArr[1],
        titula: nastavniciTituleArr[i].value,
        kolegij: this.sifraOpis
      }

      nastavnici.push(nastavnik);
    }

    let kolegijInfo: KolegijInfo = {
      sifra: '',
      informacije: informacije,
      kolegij: this.sifraOpis
    }

    let kolegij: KolegijZahtjev = {
      naziv: naziv,
      ects: Number(ects),
      semestar: Number(semestar),
      isvuSifra: isvuSifra,
      obavezan: Boolean(obavezan),
      studijSifra: studijSifra,
      kolegijInfo: kolegijInfo,
      nastavnici: nastavnici
    }

    if (!isAzuriranje) {
      this.pregledKolegijaService.spremiKolegij(kolegij)
        .subscribe(kolegij => {
          window.location.reload();
          return;
        }, error => {
          console.log(error);
        });
    }

    /* this.pregledStudenataService.azurirajStudenta(student, this.student.korisnickoIme)
       .subscribe(student => {
         window.location.reload();
       }, error => {
         console.log(error);
       });*/
  }
}
