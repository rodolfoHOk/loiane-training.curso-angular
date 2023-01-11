import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent {
  usuario = {
    nome: 'Rodolfo',
    email: 'rodolfo@email.com',
  };

  onSubmit(form: NgForm) {
    console.log(form.value);

    console.log(this.usuario);
  }
}
