import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Endereco } from './endereco';

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

  constructor(private http: HttpClient) {}

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

  consultaCEP(event: FocusEvent, form: NgForm) {
    const inputElement = event.target as HTMLInputElement;
    let cep = inputElement.value.replace(/\D/g, '');

    if (cep !== '') {
      let validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {
        this.resetDadosForm(form);

        let url = `https://viacep.com.br/ws/${cep}/json`;

        this.http.get<Endereco>(url).subscribe((dados) => {
          this.populaDadosForm(dados, form);
        });
      }
    }
  }

  private populaDadosForm(dados: Endereco, form: NgForm) {
    // form.setValue({
    //   nome: form.value.nome,
    //   email: form.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: form.value.endereco.numero,
    //     complemento: dados.complemento,
    //     logradouro: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf,
    //   },
    // });

    form.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  private resetDadosForm(form: NgForm) {
    form.form.patchValue({
      endereco: {
        complemento: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
    });
  }
}
