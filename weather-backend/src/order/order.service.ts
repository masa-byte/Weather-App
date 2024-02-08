import { Injectable } from '@nestjs/common';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        private productService: ProductService
    ) { }

    async createOrder(order: Order): Promise<Order> {
        const newOrder = new this.orderModel(order);
        return newOrder.save();
    }

    async getTotalNumberOfOrders(userId: string): Promise<number> {
        return this.orderModel.countDocuments({ user: userId, reviewed: false }).exec();
    }

    async getOrdersByPageIndexPageSize(pageIndex: number, pageSize: number, userId: string): Promise<Order[]> {
        return this.orderModel
            .find({ user: userId, reviewed: false })
            .skip(pageIndex * pageSize)
            .limit(pageSize)
            .populate('products', 'name price description')
            .exec();
    }

    async rateOrder(id: string, ratings: number[]): Promise<Order> {
        const order = await this.orderModel.findById(id).populate('products').exec();
        for (let index = 0; index < order.products.length; index++) {
            const product = order.products[index];
            product.gradeSum += ratings[index];
            product.gradeCount++;
            
            await this.productService.updateProduct(product._id, product);
          }
        order.reviewed = true;
        return this.orderModel.findByIdAndUpdate(id, order, { new: true }).exec();
    }
}
