import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud-service';
import { Curso } from './cursos';

@Injectable({
  providedIn: 'root',
})
export class CursosService extends CrudService<Curso> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}/cursos`);
  }
}
