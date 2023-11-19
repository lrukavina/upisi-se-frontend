export interface UpisZahtjev {
  studijSifra: string,
  semestar: number,
  minBrojEctsa: number,
  maxBrojEctsa: number,
  datumOd: Date,
  datumDo: Date,
  obavezniKolegijiSifre: string[],
  izborniKolegijiSifre: string[]
}
