import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Endereco } from './endereco';
import { VirtualTimeScheduler } from 'rxjs';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

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

  constructor(
    private http: HttpClient,
    private consultaCepService: ConsultaCepService
  ) {}

  onSubmit(form: NgForm) {
    this.http
      .post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe((dados) => {
        console.log(dados);
        form.form.reset();
      });
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
    let cep = inputElement.value;

    if (cep && cep !== '') {
      this.resetDadosForm(form);

      this.consultaCepService
        .consultaCep(cep)
        ?.subscribe((dados) => this.populaDadosForm(dados as Endereco, form));
    }
  }

  private populaDadosForm(dados: Endereco, form: NgForm) {
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
