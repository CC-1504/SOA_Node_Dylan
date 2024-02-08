import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageDto } from '../../../../dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('storages')
export class StorageController {
    constructor(private storageService: StorageService) {}

    @MessagePattern('addstorage')
    async addStorage(@Body() payload: any) {
        const { dto, access_token } = payload;
        return this.storageService.addStorage(dto);
    }

    @MessagePattern('getstorage')
    async getStorage(@Body() payload: any) {
        const { id, access_token } = payload;
        return this.storageService.getStorage(id);
    }

    @MessagePattern('editstorage')
    async editStorage(@Body() payload: any) {
        const { id, dto, access_token } = payload;
        return this.storageService.editStorage(id, dto);
    }

    @MessagePattern('deletestorage')
    async deleteStorage(@Body() payload: any) {
        const { id, access_token } = payload;
        return this.storageService.deleteStorage(id);
    }
}
