
export interface RegularUser {
    id: string;
    type: string;
    name: string;
    email: string;
    password?: string;
    surname?: string;
    phone?: string;
}