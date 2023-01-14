import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class FormValidations {
  static requiredMinCheckbox(min: number = 1) {
    const validator: ValidatorFn = (
      control: AbstractControl
    ): ValidationErrors | null => {
      const formArray = control as FormArray;
      const totalChecked = formArray.controls
        .map((v) => v.value)
        .reduce((total, current) => (current ? ++total : total), 0);
      return totalChecked >= min ? null : { requiredMinCheckbox: true };
    };
    return validator;
  }

  static cepValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const cep = control.value;
    if (cep && cep !== '') {
      const validaCep = /^[0-9]{8}$/;
      return validaCep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  };

  static equalsTo(otherField: string) {
    const validator: ValidatorFn = (
      control: AbstractControl
    ): ValidationErrors | null => {
      if (!otherField) {
        throw new Error('É necessário informar um campo.');
      }

      if (!control.root || !(<FormGroup>control.root).controls) {
        return null;
      }

      const field = (<FormGroup>control.root).get(otherField);
      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== control.value) {
        return { equalsTo: otherField };
      }
      return null;
    };
    return validator;
  }

  static getErroMsg(
    fieldName: string,
    validatorName: string,
    validatorValue?: any
  ): string {
    const config = Object({
      required: `${fieldName} é obrigatório.`,
      email: `${fieldName} inválido.`,
      emailInvalido: `${fieldName} já cadastrado.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} deve ter no máximo ${validatorValue.requiredLength} caracteres.`,
      cepInvalido: `CEP inválido`,
      equalsTo: `${fieldName} deve ser igual a ${validatorValue}`,
      requiredMinCheckbox: `Selecione ao menos uma opção`,
      pattern: `Por favor aceite os ${fieldName}`,
    });
    return config[validatorName];
  }
}
