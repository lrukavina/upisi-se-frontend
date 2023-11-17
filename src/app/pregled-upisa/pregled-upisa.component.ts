import {Component, OnInit} from '@angular/core';
import {Upis} from "./upis";
import {SifraOpis} from "../common/sifraOpis";
import {Kolegij} from "../common/kolegij";
import {PregledUpisaService} from "./pregled-upisa.service";

@Component({
  selector: 'app-pregled-upisa',
  templateUrl: './pregled-upisa.component.html',
  styleUrls: ['./pregled-upisa.component.css']
})
export class PregledUpisaComponent implements OnInit {
  modalBrisanjeOtvoren = false;
  modalPregledOtvoren = false;

  private pregledajUpisniListUrl = 'http://localhost:8080/api/upis/dohvati/pregled/korisnik';

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

  constructor(
    private pregledUpisaService: PregledUpisaService
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

  potvrdiUpisniList(): void {
    this.pregledUpisaService.potvrdiUpisniList().subscribe(upisnilist => {
      console.log(upisnilist);
    });
    window.location.reload();
  }

  pregledajUpisniList(): void {
    let url = this.pregledajUpisniListUrl + '/' + sessionStorage.getItem('korisnickoIme');
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const pdfViewer = document.getElementById('pdf');
        if (pdfViewer == null) {
          return;
        }
        pdfViewer.setAttribute('src', url);
      })
      .catch(error => console.error('Greška prilikom dohvaćanja PDF-a:', error));
  }

  izbrisiUpisniList(): void {
    this.pregledUpisaService.izbrisiUpisniList().subscribe(upisnilist => {
      console.log(upisnilist);
    });
    window.location.reload();
  }
}
