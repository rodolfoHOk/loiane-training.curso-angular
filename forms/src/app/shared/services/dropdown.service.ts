import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../models/cargo';
import { EstadoBr } from '../models/estado-br';
import { Tecnologia } from '../models/tecnologia';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBr(): Observable<EstadoBr[]> {
    return this.http.get<EstadoBr[]>('assets/dados/estados-br.json');
  }

  getCargos(): Cargo[] {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' },
    ];
  }

  getTecnologias(): Tecnologia[] {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'go', desc: 'Go Lang' },
    ];
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' },
    ];
  }
}
