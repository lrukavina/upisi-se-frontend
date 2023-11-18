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
  modalEditOtvoren = false;
  modalBrisanjeOtvoren = false;

  visokaUcilista: VisokoUciliste[] = [];
  visokaUcilistaPrikaz: VisokoUciliste[] = [];

  visokoUciliste: VisokoUciliste = {
    sifra: '',
    naziv: '',
    adresa: '',
    postanskiBroj: '',
    mjesto: '',
    iban: '',
    oib: ''
  }

  constructor(private pregledVisokihUcilistaService: PregledVisokihUcilistaService) {
  }

  ngOnInit(): void {
    this.dohvatiVisokaUcilista();
  }

  dohvatiVisokaUcilista(): void {
    this.pregledVisokihUcilistaService.dohvatiVisokaUcilista()
      .subscribe(visokaUcilista => {
        this.visokaUcilista = visokaUcilista;
        this.visokaUcilistaPrikaz = visokaUcilista;
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

  spremiVisokoUciliste(sifra: string,
                       naziv: string,
                       adresa: string,
                       postanskiBroj: string,
                       mjesto: string,
                       iban: string,
                       oib: string,
                       isAzuriranje: boolean): void {
    sifra = sifra.trim();
    naziv = naziv.trim();
    adresa = adresa.trim();
    postanskiBroj = postanskiBroj.trim();
    mjesto = mjesto.trim();
    iban = iban.trim();
    oib = oib.trim();

    let visokoUciliste: VisokoUciliste = {
      sifra: sifra,
      naziv: naziv,
      adresa: adresa,
      postanskiBroj: postanskiBroj,
      mjesto: mjesto,
      iban: iban,
      oib: oib
    }

    if (!isAzuriranje) {
      this.pregledVisokihUcilistaService.spremiVisokoUciliste(visokoUciliste)
        .subscribe(student => {
          window.location.reload();
          return;
        }, error => {
          console.log(error);
        });
    }

    this.pregledVisokihUcilistaService.azurirajVisokoUciliste(visokoUciliste, this.visokoUciliste.sifra)
      .subscribe(student => {
        window.location.reload();
      }, error => {
        console.log(error);
      });

  }

  dohvatiVisokoUciliste(sifra: string): void {
    this.pregledVisokihUcilistaService.dohvatiVisokoUciliste(sifra)
      .subscribe(visokoUciliste => {
        this.visokoUciliste = visokoUciliste;
        console.log(visokoUciliste);
      }, error => {
        console.log(error);
      });
  }

  izbrisiVisokoUciliste(sifra: string): void {
    this.pregledVisokihUcilistaService.izbrisiVisokoUciliste(sifra)
      .subscribe(visokoUciliste => {
        window.location.reload();
      }, error => {
        console.log(error);
      });
  }
}
