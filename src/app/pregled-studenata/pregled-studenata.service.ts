import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Student} from "../common/student";
import {SifraOpis} from "../common/sifraOpis";
import {KorisnikZahtjev} from "../common/korisnikZahtjev";

@Injectable({
  providedIn: 'root'
})
export class PregledStudenataService {

  private studentiUrl = 'http://localhost:8080/api/korisnik/dohvati/studenti';
  private visokaUcilistaUrl = 'http://localhost:8080/api/visoko-uciliste/dohvati/padajuci-izbornik';
  private studijiUrl = 'http://localhost:8080/api/studij/dohvati/padajuci-izbornik';
  private spremiStudentaUrl = 'http://localhost:8080/api/auth/registracija';

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

  dohvatiVisokaUcilista(): Observable<SifraOpis[]> {
    return this.http.get<SifraOpis[]>(`${this.visokaUcilistaUrl}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  dohvatiStudije(visokoUcilisteSifra: string): Observable<SifraOpis[]> {
    return this.http.get<SifraOpis[]>(`${this.studijiUrl}/${visokoUcilisteSifra}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  spremiStudenta(student: KorisnikZahtjev): Observable<KorisnikZahtjev[]> {
    return this.http.post<KorisnikZahtjev[]>(`${this.spremiStudentaUrl}`, student, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
