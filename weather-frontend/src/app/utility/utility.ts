
import { CompanyUser } from "../company/company-user.model";
import { RegularUser } from "../user/regular-user.model";

export function mapToUser(user: any) {
    if (user.type === 'user') {
        return mapToRegularUser(user);
    }
    else if (user.type === 'company') {
        return mapToCompanyUser(user);
    }
    else
        return user;
}

export function mapToRegularUser(user: any): RegularUser {
    let newUser: RegularUser = {
        id: user._id,
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        type: user.type,
        surname: user.surname,
    };
    return newUser;
}

export function mapToCompanyUser(user: any): CompanyUser {
    let newUser: CompanyUser = {
        id: user._id,
        email: user.email,
        password: user.password,
        name: user.name,
        type: user.type,
        yearFounded: user.yearFounded,
        description: user.description,
        employees: user.employees,
    };
    return newUser;
}