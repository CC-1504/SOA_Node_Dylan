import { Body, Controller,  Delete,  Get, Headers, Param, Put, UseGuards } from '@nestjs/common';
import { JwtSecure } from '../auth/secure';
import { ProfileService } from './profile.service';
import { ProfileDto } from '../../../../dto';
import { MessagePattern } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';


@Controller('profiles')
export class ProfileController {

    constructor(private profileService: ProfileService){}

    @MessagePattern('addprofile')
    async addProfile(@Body() payload: any){
        const { dto, access_token } = payload;
        return await this.profileService.addProfile(dto);
    }

    @MessagePattern('getprofile')
    async getProfile(@Body() payload: any){
        const { id, access_token } = payload;
        return await this.profileService.getProfile(id);
    }

    @MessagePattern('editprofile')
    async editProfile(@Body() payload: any) {
        const { id, dto, access_token } = payload;
        return this.profileService.editProfile(id, dto);
    }

    @MessagePattern('deleteprofile')
    async deleteProfile(@Body() payload: any) {
        const { id, access_token } = payload;
        return this.profileService.deleteProfile(id);
    }
}
