import type { RolUsuario } from './usuario';

export interface UsuarioCreateDto {
    apellido:string;
    nombre: string;
    password:string;
    rol: RolUsuario;
    email:string;
}