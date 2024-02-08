import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UnitService } from './unit.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('units')
export class UnitController {
    constructor(private unitService: UnitService) {}

    @MessagePattern('addunit')
    async addUnit(@Body() payload: any) {
        const { dto, access_token } = payload;
        return this.unitService.addUnit(dto);
    }

    @MessagePattern('getunit')
    async getUnit(@Body() payload: any) {
        const { id, access_token } = payload;
        return this.unitService.getUnit(id);
    }

    @MessagePattern('editunit')
    async editUnit(@Body() payload: any) {
        const { id, dto, access_token } = payload;
        return this.unitService.editUnit(id, dto);
    }

    @MessagePattern('deleteunit')
    async deleteUnit(@Body() payload: any) {
        const { id, access_token } = payload;
        return this.unitService.deleteUnit(id);
    }

}
