import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) { }

    async createProduct(product: Product): Promise<Product> {
        const newProduct = new this.productModel(product);
        return newProduct.save();
    }

    async getTotalNumberOfProducts(companyId: string): Promise<number> {
        if (companyId.length > 0)
            return this.productModel.countDocuments({ company: companyId }).exec();
        else
            return this.productModel.countDocuments().exec();
    }

    async getProductsByPageIndexPageSize(pageIndex: number, pageSize: number, companyId: string): Promise<Product[]> {
        if (companyId.length > 0)
            return this.productModel
                .find({ company: companyId })
                .skip(pageIndex * pageSize)
                .limit(pageSize)
                .populate('company', 'name location description')
                .exec();
        else
            return this.productModel
                .find()
                .skip(pageIndex * pageSize)
                .limit(pageSize)
                .populate('company', 'name location description')
                .exec();
    }

    async getProductById(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    async getProductsByCompany(id: string): Promise<Product[]> {
        return this.productModel.find({ company: id }).exec();
    }

    async updateProduct(id: string, product: Product): Promise<Product> {
        console.log(product);
        return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    async deleteProduct(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id).exec();
    }
}
