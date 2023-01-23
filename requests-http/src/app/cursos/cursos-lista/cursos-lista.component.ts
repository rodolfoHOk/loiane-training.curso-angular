import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  cursos?: Curso[];

  constructor(private service: CursosService) {}

  ngOnInit(): void {
    this.subscription = this.service
      .list()
      .subscribe((data) => (this.cursos = data));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
