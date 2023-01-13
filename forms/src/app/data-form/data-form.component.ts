import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoBr } from '../shared/models/estado-br';
import { DropdownService } from '../shared/services/dropdown.service';
import { Endereco } from '../template-form/endereco';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  form!: FormGroup;
  estados: EstadoBr[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService
  ) {}

  ngOnInit(): void {
    this.dropdownService
      .getEstadosBr()
      .subscribe((dados) => (this.estados = dados));

    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        logradouro: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
      }),
    });
  }

  aplicaCssErro(campo: string) {
    return { 'is-invalid': this.verificaValidTouched(campo) };
  }

  verificaValidTouched(campo: string): boolean {
    return (
      !this.form.get(campo)?.valid! &&
      (this.form.get(campo)?.touched! || this.form.get(campo)?.dirty!)
    );
  }

  verificaEmailInvalido() {
    let campoEmail = this.form.get('email');
    if (campoEmail?.errors) {
      return (
        campoEmail?.errors!['email'] && (campoEmail.touched || campoEmail.dirty)
      );
    }
  }

  verificaEmailRequerido() {
    let campoEmail = this.form.get('email');
    if (campoEmail?.errors) {
      return (
        campoEmail?.errors!['required'] &&
        (campoEmail.touched || campoEmail.dirty)
      );
    }
  }

  consultaCep() {
    let cep = this.form.get('endereco.cep')?.value;
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      let validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {
        this.resetDadosForm();

        let url = `https://viacep.com.br/ws/${cep}/json`;

        this.http.get<Endereco>(url).subscribe((dados) => {
          this.populaDadosForm(dados);
        });
      }
    }
  }

  private populaDadosForm(dados: Endereco) {
    this.form.patchValue({
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

  private resetDadosForm() {
    this.form.patchValue({
      endereco: {
        complemento: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(this.form.value))
        .subscribe({
          next: (dados) => {
            console.log(dados);
            this.reset();
          },
          error: (error) => alert(error.message),
        });
    } else {
      this.verificaValidationsForm(this.form);
    }
  }

  verificaValidationsForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidationsForm(controle);
      }
    });
  }

  reset() {
    this.form.reset();
  }
}
