export interface UsuarioResponseDto {
    id: string | number;
    nombre: string;
    apellido: string;
    email: string;
    roles: string[];
    activo: boolean
}