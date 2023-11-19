import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {KolegijPregled} from "../common/kolegijPregled";
import {KolegijZahtjev} from "../common/kolegijZahtjev";
import {KorisnikZahtjev} from "../common/korisnikZahtjev";

@Injectable({
  providedIn: 'root'
})
export class PregledKolegijaService {
  private dohvatiKolegijeUrl = 'http://localhost:8080/api/kolegij/dohvati/sve';
  private spremiKolegijUrl = 'http://localhost:8080/api/kolegij/spremi';

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

  dohvatiKolegije(): Observable<KolegijPregled[]> {
    return this.http.get<KolegijPregled[]>(`${this.dohvatiKolegijeUrl}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  spremiKolegij(kolegij: KolegijZahtjev): Observable<KolegijZahtjev[]> {
    return this.http.post<KolegijZahtjev[]>(`${this.spremiKolegijUrl}`, kolegij, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  azurirajKolegij(student: KorisnikZahtjev, korisnickoIme: string): Observable<KorisnikZahtjev[]> {
    return this.http.put<KorisnikZahtjev[]>(`${this.spremiKolegijUrl}/${korisnickoIme}`, student, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
