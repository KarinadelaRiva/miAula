export interface User {
    id: string;
    lastName: string;
    name: string;
    password?: string;
    role?: 'ADMIN' | 'PROFESOR';
    email: string;
    active: boolean;
}