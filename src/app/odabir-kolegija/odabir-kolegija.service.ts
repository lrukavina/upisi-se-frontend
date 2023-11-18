import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {KolegijPregled} from "../common/kolegijPregled";
import {OdabraniKolegij} from "../common/odabraniKolegij";

@Injectable({
  providedIn: 'root'
})
export class OdabirKolegijaService {

  private odaberiKolegijeUrl = 'http://localhost:8080/api/upisni-list/azuriraj';
  private dohvatiKolegijPregledUrl = 'http://localhost:8080/api/kolegij/dohvati';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
  };

  handleError(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }

  dohvatiKolegijPregled(sifra: string): Observable<KolegijPregled> {
    return this.http.get<KolegijPregled>(`${this.dohvatiKolegijPregledUrl}/${sifra}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  azurirajKolegije(odabraniKolegiji: OdabraniKolegij): Observable<OdabraniKolegij> {
    return this.http.put<OdabraniKolegij>(`${this.odaberiKolegijeUrl}/${sessionStorage.getItem('korisnickoIme')}`, odabraniKolegiji, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
