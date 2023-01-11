import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';
import { Aluno } from '../aluno';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss'],
})
export class AlunoFormComponent
  implements OnInit, OnDestroy, IFormCanDeactivate
{
  aluno: Aluno = {
    id: 0,
    nome: '',
    email: '',
  };
  subscription?: Subscription;
  private formMudou: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunoService: AlunosService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];

      if (id) {
        this.aluno = this.alunoService.getAluno(Number(id))!;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onInput() {
    this.formMudou = true;
    console.log('mudou');
  }

  podeMudarRota() {
    if (this.formMudou) {
      return confirm('Tem certeza que deseja sair desta página');
    }

    return true;
  }

  podeDesativar(): boolean {
    return this.podeMudarRota();
  }
}
