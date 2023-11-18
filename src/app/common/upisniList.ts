import {SifraOpis} from "./sifraOpis";
import {OdabraniKolegijPregled} from "./odabraniKolegijPregled";

export interface UpisniList {
  sifra: string,
  brojEctsa: number,
  cijenaPoEctsu: string,
  ukupnaCijena: string,
  upisniBroj: string,
  status: string,
  upisSifra: string,
  korisnikSifra: string,
  korisnik: SifraOpis,
  odabraniKolegiji: OdabraniKolegijPregled[]
}
