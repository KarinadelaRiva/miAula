export interface Usuario {
    id:string;
    apellido:string;
    nombre: string;
    password?:string;
    email:string;
    activo:boolean;
}