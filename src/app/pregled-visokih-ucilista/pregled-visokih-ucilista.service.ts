import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {VisokoUciliste} from "../common/visokoUciliste";

@Injectable({
  providedIn: 'root'
})
export class PregledVisokihUcilistaService {

  private visokaUcilistaUrl = 'http://localhost:8080/api/visoko-uciliste/dohvati/sve';

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
}
