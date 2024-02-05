import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.schema';
import { Public } from 'src/auth/decorators/metadata';

@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService
    ) { }

    @Get()
    async getAllCompanies() {
        try {
            const companies = await this.companyService.getAllCompanies()
            return companies
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Get(':id')
    async getCompanyById(@Param('id') id: string) {
        try {
            const company = await this.companyService.getCompanyById(id)
            return company
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Get('name/:name')
    async getCompanyByName(@Param('name') name: string) {
        try {
            const company = await this.companyService.getCompanyByName(name)
            return company
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Post()
    async createCompany(@Body('company') company: Company) {
        try {
            const res = await this.companyService.createCompany(company)
            return res
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Put(':id')
    async updateCompany(@Param('id') id: string, @Body('company') company: Company) {
        try {
            const res = await this.companyService.updateCompany(id, company)
            return res
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Delete(':id')
    async deleteCompany(@Param('id') id: string) {
        try {
            const res = await this.companyService.deleteCompany(id)
            return res
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
