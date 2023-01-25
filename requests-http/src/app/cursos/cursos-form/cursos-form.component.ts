import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private alertService: AlertModalService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {
    //   const id = params['id'];
    //   const curso$ = this.service.findById(id);
    //   curso$.subscribe((curso) => this.updateForm(curso));
    // });

    this.activatedRoute.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.service.findById(id))
        // switchMap((curso) => this.aulasService.obterAulas(curso.id))
      )
      .subscribe((curso) => this.updateForm(curso));

    // Outros operadores do RxJS
    // concatMap => ordem da requisição importa
    // mergeMap => ordem não importa
    // exhaustMap => aguarda uma requisição acabar para iniciar a próxima

    this.form = this.fb.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  updateForm(curso: Curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  }

  getField(field: string) {
    return this.form?.get(field);
  }

  applyCssError(field: string) {
    return {
      'is-invalid': this.verifyValidTouchedOrDirty(field),
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.form?.valid) {
      this.service.create(this.form.value).subscribe({
        next: (success) => {
          console.log(success);
          this.alertService.showAlertSuccess('Curso criado com sucesso.');
          this.reset();
          this.location.back();
        },
        error: (error) => {
          console.error(error);
          this.alertService.showAlertDanger(
            'Erro ao criar curso. Tente novamente.'
          );
        },
        complete: () => console.log('Requisição completada'),
      });
    } else {
      this.verificaValidationsForm(this.form);
    }
  }

  onCancel() {
    this.submitted = false;
    this.reset();
  }

  private reset() {
    this.form?.reset();
  }

  private verifyValidTouchedOrDirty(field: string): boolean {
    return (
      !this.form?.get(field)?.valid! &&
      (this.form?.get(field)?.touched! || this.form?.get(field)?.dirty!)
    );
  }

  private verificaValidationsForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidationsForm(controle);
      }
    });
  }
}
