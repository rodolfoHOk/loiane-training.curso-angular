import { Component } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss'],
})
export class PipesComponent {
  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms',
    rating: 4.321,
    numeroPaginas: 218,
    preco: 47.72,
    dataLancamento: new Date(2014, 10, 28),
    url: 'https://a.co/d/4x3oWhv',
  };

  livros: string[] = ['Angular', 'Java'];

  filtro?: string;

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assíncrono'), 2000);
  });

  valorAsync2 = interval(2000).pipe(map(() => 'Valor assíncrono 2'));

  addCurso(valor: string) {
    this.livros.push(valor);
  }

  obterCursos() {
    if (
      this.livros.length === 0 ||
      this.filtro === undefined ||
      this.filtro.trim() === ''
    ) {
      return this.livros;
    }

    return this.livros.filter((v) => {
      if (v.toLowerCase().indexOf(this.filtro!.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }
}
