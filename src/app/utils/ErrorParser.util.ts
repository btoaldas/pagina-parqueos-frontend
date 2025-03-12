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
}
