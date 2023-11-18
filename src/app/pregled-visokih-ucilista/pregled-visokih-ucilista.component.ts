import {Component, OnInit} from '@angular/core';
import {VisokoUciliste} from "../common/visokoUciliste";
import {PregledVisokihUcilistaService} from "./pregled-visokih-ucilista.service";

@Component({
  selector: 'app-pregled-visokih-ucilista',
  templateUrl: './pregled-visokih-ucilista.component.html',
  styleUrls: ['./pregled-visokih-ucilista.component.css']
})
export class PregledVisokihUcilistaComponent implements OnInit {

  modalOtvoren = false;

  visokaUcilista: VisokoUciliste[] = [];

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
}
