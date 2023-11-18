import {Component, OnInit} from '@angular/core';
import {PregledStudenataService} from "./pregled-studenata.service";
import {Student} from "../common/student";

@Component({
  selector: 'app-pregled-studenata',
  templateUrl: './pregled-studenata.component.html',
  styleUrls: ['./pregled-studenata.component.css']
})
export class PregledStudenataComponent implements OnInit {

  modalOtvoren = false;

  studenti: Student[] = [];
  studentiPrikaz: Student[] = [];

  constructor(private pregledStudenataService: PregledStudenataService) {
  }


  ngOnInit(): void {
    this.dohvatiStudente();
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

}
