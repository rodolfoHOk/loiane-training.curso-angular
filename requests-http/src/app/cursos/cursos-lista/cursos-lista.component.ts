import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  cursos$?: Observable<Curso[]>;

  constructor(
    private service: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], {
      relativeTo: this.activatedRoute,
    });
  }
}
