import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent {
  usuario = {
    nome: '',
    email: '',
  };

  onSubmit(form: NgForm) {
    console.log(form);
  }

  aplicaCssErro(campo: NgModel) {
    return { 'was-validated': this.verificaValidTouched(campo) };
  }

  verificaValidTouched(campo: NgModel): boolean {
    if (campo && campo.touched) {
      return !campo.valid && campo.touched;
    }

    return false;
  }
}
