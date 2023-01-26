import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './cursos';
import { delay, Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly apiUrl = `${environment.API}/cursos`;

  constructor(private http: HttpClient) {}

  list(): Observable<Curso[]> {
    return this.http
      .get<Curso[]>(`${this.apiUrl}`)
      .pipe(delay(2000), tap(console.log));
  }

  findById(id: number): Observable<Curso> {
    return this.http
      .get<Curso>(`${this.apiUrl}/${id}`)
      .pipe(take(1), tap(console.log));
  }

  create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}`, curso).pipe(take(1));
  }
}
