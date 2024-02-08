import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtSecure } from '../auth/secure';
import { UserProfile, UserService } from './user.service';
import { UserDto } from '../../../../dto'
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @MessagePattern('adduser')
    async addUser(@Body() payload: any) {
        const {dto, access_token} = payload;
        return this.userService.addUser(dto);
    }

    @MessagePattern('getuser')
    async getUser(@Body() payload: any) {
        const {id, access_token} = payload;
        return this.userService.getUser(id);
    }

    @MessagePattern('edituser')
    async editUser(@Body() payload: any) {
        const {id, dto, access_token} = payload;
        return this.userService.editUser(id, dto);
    }

    @MessagePattern('deleteuser')
    async deleteUser(@Body() payload: any) {
        const {id, access_token} = payload;
        return this.userService.deleteUser(id);
    }
}
