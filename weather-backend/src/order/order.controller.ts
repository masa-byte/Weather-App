import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post()
    async createOrder(@Body('order') order: Order) {
        try {
            const res = await this.orderService.createOrder(order)
            return res
        }
        catch (e) {
            console.log(e)
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Get('total')
    async getTotalNumberOfOrders(@Query('userId') userId: string) {
        try {
            const res = await this.orderService.getTotalNumberOfOrders(userId)
            return res
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Get()
    async getOrdersByPageIndexPageSize(
        @Query('pageIndex') pageIndex: number,
        @Query('pageSize') pageSize: number,
        @Query('userId') userId: string
    ) {
        try {
            const res = await this.orderService.getOrdersByPageIndexPageSize(pageIndex, pageSize, userId)
            return res
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Put(':id')
    async rateOrder(@Param('id') id: string, @Body('ratings') ratings: number[]) {
        try {
            const res = await this.orderService.rateOrder(id, ratings)
            return res
        }
        catch (e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
