import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { workerService } from './worker.service';
import { workerDto } from '../../../../dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('workers')
export class workerController {
    constructor(private workerService: workerService) {}

    @MessagePattern('getworker')
    async getworker(@Body() payload: any){
        const { id, access_token } = payload;
        return this.workerService.getworker(id);
    }

    @MessagePattern('addworker')
    async addworker(@Body() payload: any) {
        const { dto, access_token } = payload;
        return this.workerService.addworker(dto);
    }

    @MessagePattern('editworker')
    async editworker(@Body() payload: any) {
        const { id, dto, access_token } = payload;
        return this.workerService.editworker(id, dto);
    }
    
    @MessagePattern('deleteworker')
    async deleteworker(@Body() payload: any) {
        const { id, access_token } = payload;
        return this.workerService.deleteworker(id);
    }
}
