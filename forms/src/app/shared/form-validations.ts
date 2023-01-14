import {
  AbstractControl,
  FormArray,
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
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }
}
