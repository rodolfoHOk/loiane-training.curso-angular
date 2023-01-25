export class FormValidations {
  static getErrorMessage(
    fieldName: string,
    validatorName: string,
    validatorValue?: any
  ): string {
    const ERROR_MESSAGES = Object({
      required: `${fieldName} é obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} deve ter no máximo ${validatorValue.requiredLength} caracteres.`,
    });

    return ERROR_MESSAGES[validatorName];
  }
}
