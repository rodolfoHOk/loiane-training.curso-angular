import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent {
  form?: FormGroup;

  abstract submit(): any;

  onSubmit() {
    if (this.form?.valid) {
      this.submit();
    } else {
      this.verificaValidationsForm(this.form!);
    }
  }

  verificaValidationsForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidationsForm(controle);
      }
    });
  }

  reset() {
    this.form?.reset();
  }

  verificaValidTouched(campo: string): boolean {
    return (
      !this.form?.get(campo)?.valid! &&
      (this.form?.get(campo)?.touched! || this.form?.get(campo)?.dirty!)
    );
  }

  verificaEmailInvalido() {
    let campoEmail = this.form?.get('email');
    if (campoEmail?.errors) {
      return (
        campoEmail?.errors!['email'] && (campoEmail.touched || campoEmail.dirty)
      );
    }
  }

  verificaEmailRequerido() {
    let campoEmail = this.form?.get('email');
    if (campoEmail?.errors) {
      return (
        campoEmail?.errors!['required'] &&
        (campoEmail.touched || campoEmail.dirty)
      );
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    };
  }

  getCampo(campo: string) {
    return this.form?.get(campo);
  }
}
