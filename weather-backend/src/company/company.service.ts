import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './company.schema';
import { Role } from 'src/auth/enums/role.enum';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<Company>,
        private productService: ProductService
    ) { }

    async createCompany(company: Company): Promise<Company> {
        const companyToCreate = new Company();
        await companyToCreate.setPassword(company.password);
        company.password = companyToCreate.password; 
        company.type = Role.Company;

        const newCompany = new this.companyModel(company);
        return newCompany.save();
    }

    async getAllCompanies(): Promise<Company[]> {
        return this.companyModel.find().exec();
    }

    async getCompanyById(id: string): Promise<Company> {
        return this.companyModel.findById(id).exec();
    }

    async getCompanyByName(name: string): Promise<Company> {
        return this.companyModel.findOne({ name: name }).exec();
    }

    async getCompanyByEmail(email: string): Promise<Company> {
        return this.companyModel.findOne({ email: email }).exec();
    }

    async updateCompany(id: string, company: Company): Promise<Company> {
        return this.companyModel.findByIdAndUpdate(id, company, { new: true }).exec();
    }

    async deleteCompany(id: string): Promise<Company> {
        const products = await this.productService.getProductsByCompany(id);
        products.forEach(async product => {
            await this.productService.deleteProduct(product._id);
        });
        return this.companyModel.findByIdAndDelete(id).exec();
    }

    async comparePassword(password: string, id: string): Promise<boolean> {
        const company = await this.companyModel.findById(id).exec();
        const cmp = new Company();
        cmp.password = company.password;
        return cmp.comparePassword(password);
    }
}
