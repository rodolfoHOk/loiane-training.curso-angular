import { Component, OnInit } from '@angular/core';
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
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private alertService: AlertModalService
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
}
