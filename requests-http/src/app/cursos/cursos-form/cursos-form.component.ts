import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from 'src/app/shared/alert-modal.service';
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
    const curso = this.activatedRoute.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
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
      let successMsg = 'Curso criado com sucesso.';
      let errorMsg = 'Erro ao criar curso. Tente novamente.';

      if (this.form.value.id) {
        successMsg = 'Curso atualizado com sucesso.';
        errorMsg = 'Erro ao atualizar curso. Tente novamente.';
      }

      this.service.save(this.form.value).subscribe({
        next: () => {
          this.alertService.showAlertSuccess(successMsg);
          this.location.back();
        },
        error: () => {
          this.alertService.showAlertDanger(errorMsg);
        },
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
