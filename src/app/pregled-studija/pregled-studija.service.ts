import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {StudijPregled} from "../common/studijPregled";
import {KorisnikZahtjev} from "../common/korisnikZahtjev";
import {StudijZahtjev} from "../common/studijZahtjev";

@Injectable({
  providedIn: 'root'
})
export class PregledStudijaService {
  private dohvatiStudijeUrl = 'http://localhost:8080/api/studij/dohvati/sve';
  private dohvatiStudijUrl = 'http://localhost:8080/api/kolegij/dohvati';
  private spremiStudijUrl = 'http://localhost:8080/api/studij/spremi';
  private azurirajStudijUrl = 'http://localhost:8080/api/kolegij/azuriraj';
  private izbrisiStudijUrl = 'http://localhost:8080/api/kolegij/izbrisi';

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

  dohvatiStudije(): Observable<StudijPregled[]> {
    return this.http.get<StudijPregled[]>(`${this.dohvatiStudijeUrl}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  spremiStudij(studij: StudijZahtjev): Observable<StudijZahtjev> {
    return this.http.post<StudijZahtjev>(`${this.spremiStudijUrl}`, studij, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
