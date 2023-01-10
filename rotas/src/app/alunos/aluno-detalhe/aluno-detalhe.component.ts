import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss'],
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {
  aluno: any;
  subscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alunoService: AlunosService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];

      this.aluno = this.alunoService.getAluno(Number(id));
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }
}
