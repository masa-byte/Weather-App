import { Company } from "src/company/company.schema";
import { User } from "src/user/user.schema";


export function mapMongoDocToUser(doc: any): User | Company {
    if (doc.type == 'company') {
        return mapMongoDocToCompanyUser(doc)
    }
    else {
        return mapMongoDocToRegularUser(doc)
    }
}

export function mapMongoDocToRegularUser(doc: any, passwordInclude: boolean = true): User {
    const user = new User();
    user._id = doc._id;
    user.name = doc.name;
    user.email = doc.email;
    if (passwordInclude)
        user.password = doc.password;
    user.phone = doc.phone;
    user.surname = doc.surname;
    user.type = doc.type;
    return user;
}

export function mapMongoDocToCompanyUser(node: any, passwordInclude: boolean = true): Company {
    const user = new Company();
    user._id = node._id;
    user.name = node.name;
    user.email = node.email;
    if (passwordInclude)
        user.password = node.password;
    user.type = node.type;
    user.description = node.description;
    user.location = node.location;
    user.yearFounded = node.yearFounded;
    user.employees = node.employees;
    return user;
}
