import { CompanyUser } from "../../company/company-user.model";


export interface CompanyState {
    company: CompanyUser | null;
    error: string;
}