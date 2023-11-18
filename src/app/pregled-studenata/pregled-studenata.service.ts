import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Student} from "../common/student";

@Injectable({
  providedIn: 'root'
})
export class PregledStudenataService {

  private studentiUrl = 'http://localhost:8080/api/korisnik/dohvati/studenti';

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

  dohvatiStudente(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.studentiUrl}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
