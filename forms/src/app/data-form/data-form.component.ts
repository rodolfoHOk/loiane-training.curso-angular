import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { Cargo } from '../shared/models/cargo';
import { EstadoBr } from '../shared/models/estado-br';
import { Tecnologia } from '../shared/models/tecnologia';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { Endereco } from '../template-form/endereco';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  form!: FormGroup;
  estados?: Observable<EstadoBr[]>;

  cargos: Cargo[] = [];
  tecnologias: Tecnologia[] = [];
  newsletterOp: any[] = [];
  frameworks = ['Angular', 'React', 'Vue', 'Svelte'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {}

  ngOnInit(): void {
    this.estados = this.dropdownService.getEstadosBr();

    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();

    this.form = this.formBuilder.group({
      nome: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.validarEmail.bind(this)],
      ],
      confirmarEmail: [
        '',
        [Validators.required, FormValidations.equalsTo('email')],
      ],
      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, FormValidations.cepValidator]],
        numero: ['', Validators.required],
        complemento: [''],
        logradouro: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
      }),
      cargo: [null],
      tecnologias: [[]],
      newsletter: ['s'],
      termos: [false, Validators.pattern('true')],
      frameworks: this.buildFrameworks(),
    });
  }

  buildFrameworks() {
    const values = this.frameworks.map(() => new FormControl(false));
    return this.formBuilder.array(
      values,
      FormValidations.requiredMinCheckbox(1)
    );
  }

  getFrameworksFormArray() {
    return this.form.get('frameworks') as FormArray;
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    };
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

    if (cep && cep !== '') {
      this.resetDadosForm();

      this.consultaCepService.consultaCep(cep)?.subscribe((dados) => {
        this.populaDadosForm(dados as Endereco);
      });
    }
  }

  private populaDadosForm(dados: Endereco) {
    this.form.patchValue({
      endereco: {
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
    let submitValue = Object.assign({}, this.form.value);

    submitValue = Object.assign(submitValue, {
      frameworks: submitValue.frameworks
        .map((value: boolean, index: number) =>
          value ? this.frameworks[index] : null
        )
        .filter((v: string) => v !== null),
    });

    if (this.form.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(submitValue))
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

  setCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.form.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: Cargo, obj2: Cargo): boolean {
    return obj1 && obj2
      ? obj1.nome === obj2.nome && obj1.nivel === obj2.nivel
      : obj1 === obj2;
  }

  setTecnologias() {
    this.form.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }

  compararTecnologias(obj1: Tecnologia, obj2: Tecnologia): boolean {
    return obj1 === obj2;
  }

  validarEmail(control: AbstractControl): ValidationErrors | null {
    return this.verificaEmailService
      .verificarEmail(control.value)
      .pipe(
        map((emailExiste) => (emailExiste ? { emailInvalido: true } : null))
      );
  }
}
