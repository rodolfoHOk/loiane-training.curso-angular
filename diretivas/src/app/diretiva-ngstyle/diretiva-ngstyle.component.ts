/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngstyle',
  templateUrl: './diretiva-ngstyle.component.html',
  styleUrls: ['./diretiva-ngstyle.component.scss'],
})
export class DiretivaNgstyleComponent {
  ativo: boolean = false;
  tamanhoFonte: number = 20;

  mudarAtivo() {
    this.ativo = !this.ativo;
  }
}
