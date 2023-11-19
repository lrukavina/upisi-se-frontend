import {KolegijInfo} from "./kolegijInfo";
import {Nastavnik} from "./nastavnik";

export interface KolegijZahtjev {
  naziv: string,
  ects: number,
  semestar: number,
  isvuSifra: string,
  obavezan: boolean,
  studijSifra: string,
  kolegijInfo: KolegijInfo,
  nastavnici: Nastavnik[]
}
