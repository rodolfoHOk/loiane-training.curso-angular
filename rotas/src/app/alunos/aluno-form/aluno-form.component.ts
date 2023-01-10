import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss'],
})
export class AlunoFormComponent implements OnInit, OnDestroy {
  aluno: { id: number; nome: string; email: string } = {
    id: 0,
    nome: '',
    email: '',
  };
  subscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunoService: AlunosService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];

      if (id) {
        this.aluno = this.alunoService.getAluno(Number(id));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
