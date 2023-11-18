import {Component, OnInit} from '@angular/core';
import {PregledStudenataService} from "./pregled-studenata.service";
import {Student} from "../common/student";
import {SifraOpis} from "../common/sifraOpis";
import {KorisnikZahtjev} from "../common/korisnikZahtjev";

@Component({
  selector: 'app-pregled-studenata',
  templateUrl: './pregled-studenata.component.html',
  styleUrls: ['./pregled-studenata.component.css']
})
export class PregledStudenataComponent implements OnInit {

  modalOtvoren = false;

  studenti: Student[] = [];
  studentiPrikaz: Student[] = [];

  visokaUcilista: SifraOpis[] = [];
  studiji: SifraOpis[] = [];

  constructor(private pregledStudenataService: PregledStudenataService) {
  }


  ngOnInit(): void {
    this.dohvatiStudente();
    this.dohvatiVisokaUcilista();
  }

  dohvatiStudente(): void {
    this.pregledStudenataService.dohvatiStudente()
      .subscribe(studenti => {
        this.studenti = studenti;
        this.studentiPrikaz = studenti;
        console.log(studenti);
      }, error => {
        console.log(error);
      });
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


  pretrazi(): void {
    let inputPolje = document.getElementById('pretraga') as HTMLInputElement;
    let str = inputPolje.value;

    this.studentiPrikaz = this.studenti;

    this.studentiPrikaz = this.studenti.filter(student =>
      student.ime.toLowerCase().includes(str.toLowerCase()) ||
      student.prezime.toLowerCase().includes(str.toLowerCase()) ||
      student.jmbag.toLowerCase().includes(str.toLowerCase()) ||
      student.visokoUciliste.opis.toLowerCase().includes(str.toLowerCase())
    );
  }

  spremiStudenta(ime: string,
                 prezime: string,
                 jmbag: string,
                 semestar: string,
                 adresa: string,
                 lozinka: string,
                 visokoUcilisteSifra: string,
                 studijSifra: string): void {
    ime = ime.trim();
    prezime = prezime.trim();
    jmbag = jmbag.trim();
    semestar.trim();
    adresa = adresa.trim();
    lozinka = lozinka.trim();
    let rola = 'STUDENT';
    visokoUcilisteSifra = visokoUcilisteSifra.trim();
    studijSifra = studijSifra.trim();

    let student: KorisnikZahtjev = {
      ime: ime,
      prezime: prezime,
      jmbag: jmbag,
      semestar: Number(semestar),
      adresa: adresa,
      lozinka: lozinka,
      rola: rola,
      visokoUcilisteSifra: visokoUcilisteSifra,
      studijSifra: studijSifra
    }

    this.pregledStudenataService.spremiStudenta(student)
      .subscribe(student => {
        window.location.reload();
      }, error => {
        console.log(error);
      });
  }

}
