import { esCodigoValido, normalizarCodigo } from './codigo';

describe('códigos de objetos', () => {
  it('acepta exactamente seis letras o números y normaliza a mayúsculas', () => {
    expect(esCodigoValido('ab1234')).toBeTrue();
    expect(normalizarCodigo('ab1234')).toBe('AB1234');
  });

  it('rechaza longitudes distintas, espacios y caracteres no alfanuméricos', () => {
    expect(esCodigoValido('ABC12')).toBeFalse();
    expect(esCodigoValido('ABC1234')).toBeFalse();
    expect(esCodigoValido('ABC 12')).toBeFalse();
    expect(esCodigoValido('ABC-12')).toBeFalse();
  });
});
