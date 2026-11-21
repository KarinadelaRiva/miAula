export const CODIGO_PATTERN = /^[A-Za-z0-9]{6}$/;

export function esCodigoValido(codigo: string): boolean {
  return CODIGO_PATTERN.test(codigo);
}

export function normalizarCodigo(codigo: string): string {
  return codigo.toUpperCase();
}
