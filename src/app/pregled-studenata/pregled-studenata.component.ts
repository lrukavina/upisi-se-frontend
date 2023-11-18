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

  constructor(private pregledStudenataService: PregledStudenataService) {
  }


  ngOnInit(): void {
    this.dohvatiStudente();
  }

  dohvatiStudente(): void {
    this.pregledStudenataService.dohvatiStudente()
      .subscribe(studenti => {
        this.studenti = studenti;
        console.log(studenti);
      }, error => {
        console.log(error);
      });
  }


}
