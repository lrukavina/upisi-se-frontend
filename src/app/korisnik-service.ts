import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {KorisnikInfo} from "./korisnikInfo";

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  private korisnikInfoUrl = 'http://localhost:8080/api/korisnik/dohvati/info';

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

  dohvatiKorisnikInfo(): Observable<KorisnikInfo> {
    return this.http.get<KorisnikInfo>(`${this.korisnikInfoUrl}/${sessionStorage.getItem('korisnickoIme')}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
