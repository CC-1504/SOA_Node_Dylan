import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { productService } from './product.service';
import { ItemDto } from '../../../../dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('items')
export class productController {
    constructor(private productService: productService) {}

    @MessagePattern('additem')
    async addItem(@Body() payload: any) {
        const { dto, access_token } = payload
        return await this.productService.addItem(dto);
    }

    @MessagePattern('getitem')
    async getItem(@Body() payload: any) {
        const { id, access_token } = payload
        return await this.productService.getItem(id);
    }

    @MessagePattern('edititem')
    async editItem(@Body() payload: any) {
        const { id, dto, access_token } = payload
        return await this.productService.editItem(id, dto);
    }

    @MessagePattern('deleteitem')
    async deleteItem(@Body() payload: any) {
        const { id, access_token } = payload
        return await this.productService.deleteItem(id);
    }
}
