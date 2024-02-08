
export interface CompanyUser {
    id: string;
    name: string;
    type: string;
    email: string;
    password?: string;
    yearFounded?: number;
    description?: string;
    employees?: number;
}