import { Component } from '@angular/core';

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
}
