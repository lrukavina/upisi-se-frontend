import {SifraOpis} from "./sifraOpis";

export interface StudijPregled {
  sifra: string,
  nazivStudija: string,
  nazivSmjera: string,
  ectsCijena: number,
  ectsCijenaFormatirana: string,
  visokoUciliste: SifraOpis

}
