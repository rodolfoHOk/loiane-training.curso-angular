import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  aplicaCssErro(campo: string) {
    return { 'is-invalid': this.verificaValidTouched(campo) };
  }

  verificaValidTouched(campo: string): boolean {
    return !this.form.get(campo)?.valid! && this.form.get(campo)?.touched!;
  }

  verificaEmailInvalido() {
    let campoEmail = this.form.get('email');
    if (campoEmail?.errors) {
      return campoEmail?.errors!['email'] && campoEmail.touched;
    }
  }

  verificaEmailRequerido() {
    let campoEmail = this.form.get('email');
    if (campoEmail?.errors) {
      return campoEmail?.errors!['required'] && campoEmail.touched;
    }
  }

  onSubmit() {
    this.http
      .post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .subscribe({
        next: (dados) => {
          console.log(dados);
          this.reset();
        },
        error: (error) => alert(error.message),
      });
  }

  reset() {
    this.form.reset();
  }
}
