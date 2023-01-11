import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Aluno } from '../aluno';
import { AlunosService } from '../alunos.service';

@Injectable({
  providedIn: 'root',
})
export class AlunoDetalheResolver implements Resolve<Aluno | undefined> {
  constructor(private alunosService: AlunosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Aluno | undefined> {
    console.log('guard resolver - aluno detalhe');

    let id = route.params['id'];

    let aluno = this.alunosService.getAluno(Number(id));

    return of(aluno);
  }
}
