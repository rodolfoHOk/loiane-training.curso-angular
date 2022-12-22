import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  // styleUrls: ['./data-binding.component.css'], ou
  styles: [
    `
      .highlight {
        background-color: green;
        font-weight: bold;
      }
    `,
  ],
})
export class DataBindingComponent {
  url: string = 'https://loiane.training';
  cursoAngular: boolean = true;
  urlImagem: string = 'https://picsum.photos/400/200';

  valorAtual: string = '';
  valorSalvo: string = '';
  isMouseOver: boolean = false;

  nome: string = 'abc';
  pessoa = {
    nome: 'anônimo',
    idade: 20,
  };

  nomeDoCurso: string = 'Angular';

  valorInicial: number = 10;

  getValor() {
    return 1;
  }

  getCurtirCurso() {
    return true;
  }

  botaoClicado() {
    alert('Clicou no botão');
  }

  onKeyUp(event: KeyboardEvent) {
    this.valorAtual = (<HTMLInputElement>event.target).value;
  }

  salvarValor(value: string) {
    this.valorSalvo = value;
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(event: { novoValor: number }) {
    console.log(event.novoValor);
  }
}
