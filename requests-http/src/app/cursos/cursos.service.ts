import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './cursos';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly apiUrl = `${environment.API}/cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(`${this.apiUrl}`).pipe(tap(console.log));
  }
}
