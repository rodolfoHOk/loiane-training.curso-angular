import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.css'],
  // inputs: ['nomeCurso:nome'], // ou
})
export class InputPropertyComponent {
  @Input('nome') nomeCurso: string = ''; // ou
  // nomeCurso: string = ''; // ou
}
