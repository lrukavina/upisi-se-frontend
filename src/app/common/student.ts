import {SifraOpis} from "./sifraOpis";

export interface Student {
  ime: string,
  prezime: string,
  korisnickoIme: string,
  jmbag: string,
  semestar: number,
  adresa: string,
  rola: string,
  visokoUciliste: SifraOpis,
  studij: SifraOpis
}
