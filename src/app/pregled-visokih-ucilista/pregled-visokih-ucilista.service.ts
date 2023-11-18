import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {VisokoUciliste} from "../common/visokoUciliste";

@Injectable({
  providedIn: 'root'
})
export class PregledVisokihUcilistaService {

  private visokaUcilistaUrl = 'http://localhost:8080/api/visoko-uciliste/dohvati/sve';
  private visokoUcilisteUrl = 'http://localhost:8080/api/visoko-uciliste/dohvati'
  private spremiVisokoUcilisteUrl = 'http://localhost:8080/api/visoko-uciliste/spremi';
  private azurirajVisokoUcilisteUrl = 'http://localhost:8080/api/visoko-uciliste/azuriraj';

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


  dohvatiVisokaUcilista(): Observable<VisokoUciliste[]> {
    return this.http.get<VisokoUciliste[]>(`${this.visokaUcilistaUrl}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  dohvatiVisokoUciliste(sifra: string): Observable<VisokoUciliste> {
    return this.http.get<VisokoUciliste>(`${this.visokoUcilisteUrl}/${sifra}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  spremiVisokoUciliste(visokoUciliste: VisokoUciliste): Observable<VisokoUciliste> {
    return this.http.post<VisokoUciliste>(`${this.spremiVisokoUcilisteUrl}`, visokoUciliste, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  azurirajVisokoUciliste(visokoUciliste: VisokoUciliste, sifra: string): Observable<VisokoUciliste> {
    return this.http.put<VisokoUciliste>(`${this.azurirajVisokoUcilisteUrl}/${sifra}`, visokoUciliste, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
