import {Component} from '@angular/core';
import {SifraOpis} from "../common/sifraOpis";
import {Kolegij} from "../common/kolegij";
import {Upis} from "../pregled-upisa/upis";
import {PregledUpisaService} from "../pregled-upisa/pregled-upisa.service";

@Component({
  selector: 'app-odabir-kolegija',
  templateUrl: './odabir-kolegija.component.html',
  styleUrls: ['./odabir-kolegija.component.css']
})
export class OdabirKolegijaComponent {
  modalOtvoren = false;

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

}
