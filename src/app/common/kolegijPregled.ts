import {KolegijInfo} from "./kolegijInfo";
import {Nastavnik} from "./nastavnik";
import {SifraOpis} from "./sifraOpis";

export interface KolegijPregled {
  naziv: string,
  ects: number,
  semestar: number,
  isvuSifra: string,
  obavezan: boolean,
  studij: SifraOpis,
  kolegijInfo: KolegijInfo,
  nastavnici: Nastavnik[]
}
