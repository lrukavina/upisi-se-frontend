import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Upis} from "./upis";

@Injectable({
  providedIn: 'root'
})
export class PregledUpisaService {

  private pregledUpisaPoKorisnikuUrl = 'http://localhost:8080/api/upis/dohvati/aktivne/korisnik';
  private pregledUpisaUrl = 'http://localhost:8080/api/upis/dohvati/sve';
  private pregledUpisaPoSifriUrl = 'http://localhost:8080/api/upis/dohvati'

  private potvrdiUpisniListUrl = 'http://localhost:8080/api/upisni-list/potvrdi/korisnik'
  private izbrisiUpisniListUrl = 'http://localhost:8080/api/upisni-list/izbrisi/korisnik'

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
  };

  handleError(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }

  constructor(private http: HttpClient) {
  }

  dohvatiSveUpise(): Observable<Upis[]> {
    return this.http.get<Upis[]>(`${this.pregledUpisaUrl}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  dohvatiUpiseZaKorisnika(): Observable<Upis> {
    return this.http.get<Upis>(`${this.pregledUpisaPoKorisnikuUrl}/${sessionStorage.getItem('korisnickoIme')}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  dohvatiUpisPoSifri(sifra: string): Observable<Upis> {
    return this.http.get<Upis>(`${this.pregledUpisaPoSifriUrl}/${sifra}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  potvrdiUpisniList(): Observable<Upis> {
    return this.http.put<Upis>(`${this.potvrdiUpisniListUrl}`, {korisnickoIme: sessionStorage.getItem('korisnickoIme')}, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  izbrisiUpisniList(): Observable<Upis> {
    return this.http.delete<Upis>(`${this.izbrisiUpisniListUrl}/${sessionStorage.getItem('korisnickoIme')}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
