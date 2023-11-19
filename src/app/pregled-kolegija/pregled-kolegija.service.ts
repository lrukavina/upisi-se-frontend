import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {KolegijPregled} from "../common/kolegijPregled";

@Injectable({
  providedIn: 'root'
})
export class PregledKolegijaService {
  private dohvatiKolegijeUrl = 'http://localhost:8080/api/kolegij/dohvati/sve';

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

}
