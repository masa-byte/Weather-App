import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './models/product.schema';
import { Public } from 'src/auth/decorators/metadata';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Get()
    async getProductsByPageIndexPageSize(
        @Query('pageIndex') pageIndex: number, 
        @Query('pageSize') pageSize: number,
        @Query('companyId') companyId: string
        ) {
        try {
            const products = await this.productService.getProductsByPageIndexPageSize(pageIndex, pageSize, companyId)
            return products
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Get('total')
    async getTotalNumberOfProducts(@Query('companyId') companyId: string) {
        try {
            const total = await this.productService.getTotalNumberOfProducts(companyId)
            return total
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Get(':id')
    async getProductById(id: string) {
        try {
            const product = await this.productService.getProductById(id)
            return product
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Post()
    async createProduct(@Body('product') product: Product) {
        try {
            const res = await this.productService.createProduct(product)
            return res
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body('product') product: Product) {
        try {
            const res = await this.productService.updateProduct(id, product)
            return res
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        try {
            const res = await this.productService.deleteProduct(id)
            return res
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
