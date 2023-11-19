import {Component} from '@angular/core';
import {PregledStudenataService} from "../pregled-studenata/pregled-studenata.service";
import {PregledStudijaService} from "./pregled-studija.service";
import {StudijPregled} from "../common/studijPregled";

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

  constructor(private pregledStudijaService: PregledStudijaService, private pregledStudenataService: PregledStudenataService) {
  }

  ngOnInit(): void {
    this.dohvatiStudije();
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


}
