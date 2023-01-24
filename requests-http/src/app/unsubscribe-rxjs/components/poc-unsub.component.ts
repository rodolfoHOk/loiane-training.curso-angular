import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-secondary">
    </app-poc-base>
  `,
})
export class PocUnsubComponent implements OnInit, OnDestroy {
  nome = 'Componente com unsubscribe';
  valor?: string;

  subs: Subscription[] = [];

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.subs.push(
      this.service
        .getValor()
        .pipe(tap((v) => console.log(this.nome, v)))
        .subscribe((novoValor) => (this.valor = novoValor))
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub.unsubscribe());
    console.log(`${this.nome} foi destruído`);
  }
}
