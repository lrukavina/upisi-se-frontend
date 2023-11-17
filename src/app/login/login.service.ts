import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {LoginForm} from "./loginForm";
import {catchError, Observable, throwError} from "rxjs";
import {Korisnik} from "./korisnik";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/api/auth/autentikacija';

  httpOptions = {
    headers: new HttpHeaders(
      {'content-type': 'application/json'})
  };

  handleError(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }

  constructor(private http: HttpClient) {
  }

  autentikacijaKorisnika(login: LoginForm): Observable<Korisnik> {
    return this.http.post<Korisnik>(`${this.loginUrl}`, login, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


}


