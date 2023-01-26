import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal?: TemplateRef<any>;

  cursos$?: Observable<Curso[]>;
  cursoSelecionado?: Curso;

  constructor(
    private service: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService
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

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal!, {
      class: 'modal-sm',
    });
  }

  onDeleteConfirm() {
    this.service.delete(this.cursoSelecionado?.id!).subscribe({
      next: () => {
        this.alertService.showAlertSuccess('Curso deletado com sucesso.');
        this.onRefresh();
        this.deleteModalRef?.hide();
      },
      error: () => {
        this.alertService.showAlertDanger(
          'Erro ao tentar remover curso. Tente novamente mais tarde.'
        );
        this.deleteModalRef?.hide();
      },
    });
  }

  onDeleteCancel() {
    this.deleteModalRef?.hide();
  }
}
