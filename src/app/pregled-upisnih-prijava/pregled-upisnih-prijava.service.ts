import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {KolegijIzbornik} from "../common/kolegijIzbornik";
import {UpisZahtjev} from "../common/upisZahtjev";
import {UpisStatus} from "../common/upisStatus";

@Injectable({
  providedIn: 'root'
})
export class PregledUpisnihPrijavaService {
  private dohvatiKolegijeIzbornikUrl = 'http://localhost:8080/api/kolegij/dohvati/izbornik/studij';
  private dohvatiUpisniListStatuseUrl = 'http://localhost:8080/api/upisni-list/dohvati/status/upis';
  private spremiUpisnuPrijavuUrl = 'http://localhost:8080/api/upis/spremi';
  private azurirajUpisnuPrijavuUrl = 'http://localhost:8080/api/upis/azuriraj';
  private izbrisiUpisnuPrijavuUrl = 'http://localhost:8080/api/upis/izbrisi';


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

  dohvatiKolegijeZaStudij(sifra: string): Observable<KolegijIzbornik> {
    return this.http.get<KolegijIzbornik>(`${this.dohvatiKolegijeIzbornikUrl}/${sifra}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  dohvatiUpisniListStatuse(sifra: string): Observable<UpisStatus[]> {
    return this.http.get<UpisStatus[]>(`${this.dohvatiUpisniListStatuseUrl}/${sifra}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  spremiUpisnuPrijavu(upisnaPrijava: UpisZahtjev): Observable<UpisZahtjev> {
    return this.http.post<UpisZahtjev>(`${this.spremiUpisnuPrijavuUrl}`, upisnaPrijava, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  azurirajUpisnuPrijavu(upisnaPrijava: UpisZahtjev, sifra: string): Observable<UpisZahtjev> {
    return this.http.put<UpisZahtjev>(`${this.azurirajUpisnuPrijavuUrl}/${sifra}`, upisnaPrijava, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  izbrisiUpisnuPrijavu(sifra: string): Observable<any> {
    return this.http.delete<any>(`${this.izbrisiUpisnuPrijavuUrl}/${sifra}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
