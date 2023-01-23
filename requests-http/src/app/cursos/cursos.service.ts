import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './cursos';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  list() {
    return this.http
      .get<Curso[]>(`${this.apiUrl}/cursos`)
      .pipe(tap(console.log));
  }
}
