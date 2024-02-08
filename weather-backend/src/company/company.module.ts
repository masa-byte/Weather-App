import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company, CompanySchema } from './company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
        ProductModule
    ],
    controllers: [
        CompanyController
    ],
    providers: [
        CompanyService
    ],
    exports: [CompanyService]
})
export class CompanyModule { }
