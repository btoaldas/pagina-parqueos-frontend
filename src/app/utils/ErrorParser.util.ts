import { FormGroup } from '@angular/forms';

export class ErrorParser {
  public static handleError(err: any): string {
    if (err.error instanceof ErrorEvent) {
      return `Error de conexión: ${err.error.message}`;
    } else if (err.status && err.status >= 400) {
      if (err.error && err.error.ok === false) {
        const apiError = err.error;
        return `Error de API: ${apiError.message || 'Error desconocido'}`;
      } else {
        return `Error del servidor: ${JSON.stringify(err.error)}`;
      }
    }
    return `Error desconocido: ${JSON.stringify(err)}`;
  }

  public static handleFormError(form: FormGroup<any>) {
    let errorMessages: string[] = [];

    Object.keys(form.controls).forEach((controlName) => {
      const controlErrors = form.get(controlName)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((errorKey) => {
          errorMessages.push(`Error in ${controlName}: ${errorKey}`);
        });
      }
    });

    return errorMessages.join(', ');
  }
}
