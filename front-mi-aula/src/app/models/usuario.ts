export interface Usuario {
    id: string | number;
    apellido:string;
    nombre: string;
    roles: string[]; // "administrador" o "profesor"
    email: string;
    activo: boolean;
    password?: string;
}