import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {StudijPregled} from "../common/studijPregled";
import {StudijZahtjev} from "../common/studijZahtjev";

@Injectable({
  providedIn: 'root'
})
export class PregledStudijaService {
  private dohvatiStudijeUrl = 'http://localhost:8080/api/studij/dohvati/sve';
  private dohvatiStudijUrl = 'http://localhost:8080/api/studij/dohvati';
  private spremiStudijUrl = 'http://localhost:8080/api/studij/spremi';
  private azurirajStudijUrl = 'http://localhost:8080/api/studij/azuriraj';
  private izbrisiStudijUrl = 'http://localhost:8080/api/studij/izbrisi';

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

  dohvatiStudij(sifra: string): Observable<StudijPregled> {
    return this.http.get<StudijPregled>(`${this.dohvatiStudijUrl}/${sifra}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  spremiStudij(studij: StudijZahtjev): Observable<StudijZahtjev> {
    return this.http.post<StudijZahtjev>(`${this.spremiStudijUrl}`, studij, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  azurirajStudij(studij: StudijZahtjev, sifra: string): Observable<StudijZahtjev> {
    return this.http.put<StudijZahtjev>(`${this.azurirajStudijUrl}/${sifra}`, studij, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  izbrisiStudij(sifra: string): Observable<any> {
    return this.http.delete<any>(`${this.izbrisiStudijUrl}/${sifra}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
