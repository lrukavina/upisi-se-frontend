import {Component, OnInit} from '@angular/core';
import {VisokoUciliste} from "../common/visokoUciliste";
import {PregledVisokihUcilistaService} from "./pregled-visokih-ucilista.service";
import {Student} from "../common/student";

@Component({
  selector: 'app-pregled-visokih-ucilista',
  templateUrl: './pregled-visokih-ucilista.component.html',
  styleUrls: ['./pregled-visokih-ucilista.component.css']
})
export class PregledVisokihUcilistaComponent implements OnInit {

  modalOtvoren = false;

  visokaUcilista: VisokoUciliste[] = [];
  visokaUcilistaPrikaz: VisokoUciliste[] = [];

  constructor(private pregledVisokihUcilistaService: PregledVisokihUcilistaService) {
  }

  ngOnInit(): void {
    this.dohvatiVisokaUcilista();
  }

  dohvatiVisokaUcilista(): void {
    this.pregledVisokihUcilistaService.dohvatiVisokaUcilista()
      .subscribe(visokaUcilista => {
        this.visokaUcilista = visokaUcilista;
        console.log(visokaUcilista);
      }, error => {
        console.log(error);
      });
  }

  pretrazi(): void {
    let inputPolje = document.getElementById('pretraga') as HTMLInputElement;
    let str = inputPolje.value;

    this.visokaUcilistaPrikaz = this.visokaUcilista;

    this.visokaUcilistaPrikaz = this.visokaUcilista.filter(visokoUciliste =>
      visokoUciliste.naziv.toLowerCase().includes(str.toLowerCase()) ||
      visokoUciliste.adresa.toLowerCase().includes(str.toLowerCase()) ||
      visokoUciliste.postanskiBroj.toLowerCase().includes(str.toLowerCase()) ||
      visokoUciliste.mjesto.toLowerCase().includes(str.toLowerCase())
    );
  }
}
