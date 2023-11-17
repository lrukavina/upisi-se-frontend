import {SifraOpis} from "../common/sifraOpis";
import {Kolegij} from "../common/kolegij";

export interface Upis {
  sifra: string,
  visokoUciliste: SifraOpis,
  studij: SifraOpis,
  semestar: number,
  minBrojEctsa: number,
  maxBrojEctsa: number,
  datumVrijemeOd: string,
  datumVrijemeDo: string,
  status: string,
  obavezniKolegiji: Kolegij[],
  izborniKolegiji: Kolegij[]

}
