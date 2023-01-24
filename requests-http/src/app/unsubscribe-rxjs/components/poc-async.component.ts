import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [nome]="nome" [valor]="valor$ | async" estilo="bg-success">
    </app-poc-base>
  `,
})
export class PocAsyncComponent implements OnInit, OnDestroy {
  nome = 'Componente com async';
  valor$?: Observable<string>;

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.valor$ = this.service
      .getValor()
      .pipe(tap((v) => console.log(this.nome, v)));
  }

  ngOnDestroy(): void {
    console.log(`${this.nome} foi destruído`);
  }
}
