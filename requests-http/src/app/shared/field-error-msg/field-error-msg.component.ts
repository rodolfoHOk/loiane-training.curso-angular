import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-field-error-msg',
  templateUrl: './field-error-msg.component.html',
  styleUrls: ['./field-error-msg.component.scss'],
})
export class FieldErrorMsgComponent {
  @Input() control: AbstractControl | null = null;
  @Input() label: string = '';

  get errorMessage() {
    for (const propertyName in this.control?.errors) {
      if (
        this.control?.errors.hasOwnProperty(propertyName) &&
        (this.control.dirty || this.control.touched)
      ) {
        return FormValidations.getErrorMessage(
          this.label,
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }
    return null;
  }
}
