import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.scss'],
})
export class CursoDetalheComponent implements OnInit, OnDestroy {
  id?: number;
  curso: any = null;
  inscricao?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.inscricao = this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.curso = this.cursosService.getCurso(Number(this.id));

    if (!this.curso) {
      this.router.navigate(['nao-encontrado']);
    }
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }
}
