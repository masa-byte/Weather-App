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
        console.log(product);
        const newProduct = new this.productModel(product);
        return newProduct.save();
    }

    async getProductsByPageIndexPageSize(pageIndex: number, pageSize: number): Promise<Product[]> {
        return this.productModel.find().skip(pageIndex * pageSize).limit(pageSize).exec();
    }

    async getProductById(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    async getProductByCategories(categories: string[]): Promise<Product[]> {
        return this.productModel.find({ category: { $in: categories } }).exec();
    }

    // TO DO
    // get products by company

    async updateProduct(id: string, product: Product): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    async deleteProduct(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id).exec();
    }
}
