export interface UserCreateDto {
    lastName: string;
    name: string;
    password: string;
    role: 'ADMIN' | 'PROFESOR';
    email: string;
}