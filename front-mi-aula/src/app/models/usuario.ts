export type RolUsuario = 'administrador' | 'profesor';

export interface Usuario {
    id: number;
    apellido:string;
    nombre: string;
    roles: RolUsuario[];
    email: string;
    activo: boolean;
    password?: string;
}