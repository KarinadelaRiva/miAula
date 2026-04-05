export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }

  static invalidCredentials(): AuthError {
    return new AuthError('La contraseña es incorrecta');
  }

  static UserNotRegistered(): AuthError {
    return new AuthError('El correo electrónico que ingresaste no está conectado a una cuenta');
  }

  static UserDeleted(): AuthError {
    return new AuthError('El usuario registrado con este email ha sido eliminado');
  }
}