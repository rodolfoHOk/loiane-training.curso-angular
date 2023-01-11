import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss'],
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {
  aluno?: Aluno;
  subscription?: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log('ngOnInit - aluno detalhe component');

    this.subscription = this.activatedRoute.data.subscribe((info) => {
      console.log('Recebendo objeto do aluno resolver');
      this.aluno = info['aluno'];
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  editarContato() {
    this.router.navigate(['/alunos', this.aluno!.id, 'editar']);
  }
}
