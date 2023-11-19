import {Component} from '@angular/core';
import {SifraOpis} from "../common/sifraOpis";
import {PregledKolegijaService} from "../pregled-kolegija/pregled-kolegija.service";
import {PregledUpisaService} from "../pregled-upisa/pregled-upisa.service";
import {Upis} from "../pregled-upisa/upis";
import {Kolegij} from "../common/kolegij";
import {PregledStudenataService} from "../pregled-studenata/pregled-studenata.service";
import {PregledUpisnihPrijavaService} from "./pregled-upisnih-prijava.service";
import {KolegijIzbornik} from "../common/kolegijIzbornik";
import {UpisZahtjev} from "../common/upisZahtjev";

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

  sifraOpisi: SifraOpis[] = [];

  kolegiji: Kolegij[] = [];

  visokaUcilista: SifraOpis[] = [];
  studiji: SifraOpis[] = [];

  kolegijIzbornik: KolegijIzbornik = {
    obavezniKolegiji: this.sifraOpisi,
    izborniKolegiji: this.sifraOpisi
  }

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

  constructor(private pregledStudenataService: PregledStudenataService,
              private pregledKolegijaService: PregledKolegijaService,
              private pregledUpisaService: PregledUpisaService,
              private pregledUpisnihPrijavaService: PregledUpisnihPrijavaService) {
  }

  ngOnInit(): void {
    this.dohvatiUpise();
    this.dohvatiVisokaUcilista();
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

  pretrazi(): void {
    let inputPolje = document.getElementById('pretraga') as HTMLInputElement;
    let str = inputPolje.value;

    this.upisiPrikaz = this.upisi;

    this.upisiPrikaz = this.upisi.filter(upis =>
      upis.studij.opis.toLowerCase().includes(str.toLowerCase()) ||
      upis.semestar.toString().toLowerCase().includes(str.toLowerCase()) ||
      upis.visokoUciliste.opis.toLowerCase().includes(str.toLowerCase()) ||
      upis.studij.opis.toLowerCase().includes(str.toLowerCase()) ||
      upis.status.toLowerCase().includes(str.toLowerCase())
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

  dohvatiKolegije(): void {
    let studijSelect = document.getElementById('studijSelect') as HTMLInputElement;
    let studijSifra = studijSelect.value;

    let obavezniKolegijiSelect = document.getElementById('obavezniKolegijiSelect') as HTMLInputElement;
    let izborniKolegijiSelect = document.getElementById('izborniKolegijiSelect') as HTMLInputElement;

    if (studijSifra === '') {
      obavezniKolegijiSelect.disabled = true;
      izborniKolegijiSelect.disabled = true;
      return;
    }

    obavezniKolegijiSelect.disabled = false;
    izborniKolegijiSelect.disabled = false;

    this.pregledUpisnihPrijavaService.dohvatiKolegijeZaStudij(studijSifra)
      .subscribe(kolegijIzbornik => {
        this.kolegijIzbornik = kolegijIzbornik
        console.log(kolegijIzbornik);
      }, error => {
        console.log(error);
      });
  }

  spremiUpisnuPrijavu(studijSifra: string,
                      semestar: string,
                      minBrojEctsa: string,
                      maxBrojEctsa: string,
                      timestampOd: string,
                      timestampDo: string,
                      isAzuriranje: boolean): void {

    studijSifra = studijSifra.trim();
    semestar = semestar.trim();
    minBrojEctsa = minBrojEctsa.trim();
    maxBrojEctsa = maxBrojEctsa.trim();

    let obavezniKolegijiSelect = document.getElementById('obavezniKolegijiSelect') as any;
    let izborniKolegijiSelect = document.getElementById('izborniKolegijiSelect') as any;

    let obavezniKolegijiVrijednosti = obavezniKolegijiSelect.selectedOptions;
    let obavezniKolegijiSifre: string[] = [];
    for (let i = 0; i < obavezniKolegijiVrijednosti.length; i++) {
      obavezniKolegijiSifre.push(obavezniKolegijiVrijednosti.item(i).value);
    }

    let izborniKolegijiVrijednosti = izborniKolegijiSelect.selectedOptions;
    let izborniKolegijiSifre: string[] = [];
    for (let i = 0; i < izborniKolegijiVrijednosti.length; i++) {
      izborniKolegijiSifre.push(izborniKolegijiVrijednosti.item(i).value);
    }

    let upisZahtjev: UpisZahtjev = {
      studijSifra: studijSifra,
      semestar: Number(semestar),
      minBrojEctsa: Number(minBrojEctsa),
      maxBrojEctsa: Number(maxBrojEctsa),
      datumOd: new Date(timestampOd),
      datumDo: new Date(timestampDo),
      obavezniKolegijiSifre: obavezniKolegijiSifre,
      izborniKolegijiSifre: izborniKolegijiSifre
    }

    if (!isAzuriranje) {
      this.pregledUpisnihPrijavaService.spremiUpisnuPrijavu(upisZahtjev)
        .subscribe(upisnaPrijava => {
          window.location.reload();
          return;
        }, error => {
          console.log(error);
        });
    }

    /*this.pregledStudenataService.azurirajStudenta(student, this.student.korisnickoIme)
      .subscribe(upisnaPrijava => {
        window.location.reload();
      }, error => {
        console.log(error);
      });*/
  }
}
