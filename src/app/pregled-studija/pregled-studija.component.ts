import {Component} from '@angular/core';
import {PregledStudenataService} from "../pregled-studenata/pregled-studenata.service";
import {PregledStudijaService} from "./pregled-studija.service";
import {StudijPregled} from "../common/studijPregled";
import {SifraOpis} from "../common/sifraOpis";
import {StudijZahtjev} from "../common/studijZahtjev";

@Component({
  selector: 'app-pregled-studija',
  templateUrl: './pregled-studija.component.html',
  styleUrls: ['./pregled-studija.component.css']
})
export class PregledStudijaComponent {

  modalOtvoren = false;
  modalEditOtvoren = false;
  modalBrisanjeOtvoren = false;

  studiji: StudijPregled[] = [];
  studijiPrikaz: StudijPregled[] = [];

  visokaUcilista: SifraOpis[] = [];

  sifraOpis: SifraOpis = {
    sifra: '',
    opis: ''
  }

  studij: StudijPregled = {
    sifra: '',
    nazivStudija: '',
    nazivSmjera: '',
    ectsCijena: 0,
    ectsCijenaFormatirana: '',
    visokoUciliste: this.sifraOpis
  }

  constructor(private pregledStudijaService: PregledStudijaService, private pregledStudenataService: PregledStudenataService) {
  }

  ngOnInit(): void {
    this.dohvatiStudije();
    this.dohvatiVisokaUcilista();
  }

  dohvatiStudije(): void {
    this.pregledStudijaService.dohvatiStudije()
      .subscribe(studiji => {
        this.studiji = studiji;
        this.studijiPrikaz = studiji;
        console.log(studiji);
      }, error => {
        console.log(error);
      });
  }

  dohvatiStudij(sifra: string): void {
    this.pregledStudijaService.dohvatiStudij(sifra)
      .subscribe(studij => {
        this.studij = studij;
        console.log(studij);
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

  pretrazi(): void {
    let inputPolje = document.getElementById('pretraga') as HTMLInputElement;
    let str = inputPolje.value;

    this.studijiPrikaz = this.studiji;

    this.studijiPrikaz = this.studiji.filter(studij =>
      studij.nazivStudija.toLowerCase().includes(str.toLowerCase()) ||
      studij.nazivSmjera.toString().toLowerCase().includes(str.toLowerCase()) ||
      studij.visokoUciliste.opis.toString().toLowerCase().includes(str.toLowerCase())
    );
  }

  spremiStudij(nazivStudija: string,
               nazivSmjera: string,
               ectsCijena: string,
               visokoUcilisteSifra: string,
               isAzuriranje: boolean): void {
    nazivStudija = nazivStudija.trim();
    nazivSmjera = nazivSmjera.trim();
    ectsCijena = ectsCijena.trim();
    visokoUcilisteSifra = visokoUcilisteSifra.trim();

    let studijZahtjev: StudijZahtjev = {
      nazivStudija: nazivStudija,
      nazivSmjera: nazivSmjera,
      ectsCijena: Number(ectsCijena),
      visokoUcilisteSifra: visokoUcilisteSifra
    }

    if (!isAzuriranje) {
      this.pregledStudijaService.spremiStudij(studijZahtjev)
        .subscribe(studij => {
          window.location.reload();
          return;
        }, error => {
          console.log(error);
        });
    }

    this.pregledStudijaService.azurirajStudij(studijZahtjev, this.studij.sifra)
      .subscribe(studij => {
        window.location.reload();
      }, error => {
        console.log(error);
      });

  }

  izbrisiStudij(): void {
    this.pregledStudijaService.izbrisiStudij(this.studij.sifra)
      .subscribe(studij => {
        window.location.reload();
      }, error => {
        console.log(error);
      });
  }


}
