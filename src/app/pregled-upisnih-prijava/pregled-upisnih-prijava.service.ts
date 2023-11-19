import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PregledUpisnihPrijavaService {
  private dohvatiUpiseUrl = 'http://localhost:8080/api/upis/dohvati/sve';
  private dohvatiUpisUrl = 'http://localhost:8080/api/kolegij/dohvati';
  private spremiUpisUrl = 'http://localhost:8080/api/kolegij/spremi';
  private azurirajUpisUrl = 'http://localhost:8080/api/kolegij/azuriraj';
  private izbrisiUpisUrl = 'http://localhost:8080/api/kolegij/izbrisi';

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
}
