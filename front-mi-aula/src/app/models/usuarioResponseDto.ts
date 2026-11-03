import type { RolUsuario } from './usuario';

export interface UsuarioResponseDto {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    roles: RolUsuario[];
    activo: boolean
}