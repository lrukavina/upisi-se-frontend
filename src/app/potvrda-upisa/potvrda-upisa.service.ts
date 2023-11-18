import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {UpisniList} from "../common/upisniList";

@Injectable({
  providedIn: 'root'
})
export class PotvrdaUpisaService {

  private upisniListPregledUrl = 'http://localhost:8080/api/upisni-list/dohvati/korisnik';

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

  dohvatiUpisniList(): Observable<UpisniList> {
    return this.http.get<UpisniList>(`${this.upisniListPregledUrl}/${sessionStorage.getItem('korisnickoIme')}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
