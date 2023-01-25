import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
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
      console.log(this.form.value);
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
