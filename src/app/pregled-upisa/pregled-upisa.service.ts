import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Upis} from "./upis";

@Injectable({
  providedIn: 'root'
})
export class PregledUpisaService {

  private pregledUpisaUrl = 'http://localhost:8080/api/upis/dohvati/aktivne/korisnik';

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

  dohvatiUpise(): Observable<Upis> {
    return this.http.get<Upis>(`${this.pregledUpisaUrl}/${sessionStorage.getItem('korisnickoIme')}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
