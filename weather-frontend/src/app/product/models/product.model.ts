import { CompanyUser } from "../../company/company-user.model";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string[];
    company: any;
    gradeCount: number;
    gradeSum: number;
    rating?: number;
}