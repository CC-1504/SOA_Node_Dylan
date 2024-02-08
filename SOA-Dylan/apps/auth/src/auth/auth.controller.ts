import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from '../../../../dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @MessagePattern('signin')
    async signin(@Body() dto: LoginDto) {
        return await this.authService.signin(dto);
    }

    @MessagePattern('signup')
    async signup(@Body() dto: AuthDto) {
        return await this.authService.signup(dto);
    }
}
