import { Body, Controller, Delete, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthDto, workerDto, ItemDto, LoginDto, StorageDto, UnitDto } from 'dto';

@Controller()
export class AppController {
    private access_token: string = "";
    constructor(private readonly appService: AppService) {
        this.access_token = "";
    }

    @Post('signup')
    async signup(@Body() dto: AuthDto) {
        const t = await this.appService.signup(dto);
        return t;
    }

    @Post('signin')
    async signin(@Body() dto: LoginDto) {
        const t = await this.appService.signin(dto);
        return t;
    }

    // ------------------------------------------- profile -------------------------------------------

    @Post('addprofile')
    async addProfile(@Body() dto: AuthDto) {
        const t = await this.appService.addProfile(dto, this.access_token);
        return t;
    }

    @Get('getprofile/:id')
    async getProfile(@Param('id') id: number){
        const t = await this.appService.getProfile(id, this.access_token);
        
        return t;
    }

    @Put('editprofile/:id')
    async editProfile(@Param('id') id: number, @Body() dto: AuthDto) {
        const t = await this.appService.editProfile(id, dto, this.access_token);
        return t;
    }

    @Delete('deleteprofile/:id')
    async deleteProfile(@Param('id') id: number) {
        const t = await this.appService.deleteProfile(id, this.access_token);
        return t;
    }

    // --------------------------------------------- user ---------------------------------------------

    @Post('adduser')
    async addUser(@Body() dto: AuthDto) {
        const t = await this.appService.addUser(dto, this.access_token);
        return t;
    }

    @Get('getuser/:id')
    async getUser(@Param('id') id: number){
        const t = await this.appService.getUser(id, this.access_token);
        return t;
    }

    @Put('edituser/:id')
    async editUser(@Param('id') id: number, @Body() dto: AuthDto) {
        const t = await this.appService.editUser(id, dto, this.access_token);
        return t;
    }

    @Delete('deleteuser/:id')
    async deleteUser(@Param('id') id: number) {
        const t = await this.appService.deleteUser(id, this.access_token);
        return t;
    }

    // --------------------------------------------- worker ---------------------------------------------

    @Post('addworker')
    async addworker(@Body() dto: workerDto) {
        const t = await this.appService.addworker(dto, this.access_token);
        return t;
    }

    @Get('getworker/:id')
    async getworker(@Param('id') id: number){
        const t = await this.appService.getworker(id, this.access_token);
        return t;
    }

    @Put('editworker/:id')
    async editworker(@Param('id') id: number, @Body() dto: workerDto) {
        const t = await this.appService.editworker(id, dto, this.access_token);
        return t;
    }

    @Delete('deleteworker/:id')
    async deleteworker(@Param('id') id: number) {
        const t = await this.appService.deleteworker(id, this.access_token);
        return t;
    }

    // --------------------------------------------- storage ---------------------------------------------

    @Post('addstorage')
    async addStorage(@Body() dto: StorageDto) {
        const t = await this.appService.addStorage(dto, this.access_token);
        return t;
    }

    @Get('getstorage/:id')
    async getStorage(@Param('id') id: number){
        const t = await this.appService.getStorage(id, this.access_token);
        return t;
    }

    @Put('editstorage/:id')
    async editStorage(@Param('id') id: number, @Body() dto: StorageDto) {
        const t = await this.appService.editStorage(id, dto, this.access_token);
        return t;
    }

    @Delete('deletestorage/:id')
    async deleteStorage(@Param('id') id: number) {
        const t = await this.appService.deleteStorage(id, this.access_token);
        return t;
    }

    // ---------------------------------------------- unit ----------------------------------------------

    @Post('addunit')
    async addUnit(@Body() dto: UnitDto) {
        const t = await this.appService.addUnit(dto, this.access_token);
        return t;
    }

    @Get('getunit/:id')
    async getUnit(@Param('id') id: number){
        const t = await this.appService.getUnit(id, this.access_token);
        return t;
    }

    @Put('editunit/:id')
    async editUnit(@Param('id') id: number, @Body() dto: UnitDto) {
        const t = await this.appService.editUnit(id, dto, this.access_token);
        return t;
    }

    @Delete('deleteunit/:id')
    async deleteUnit(@Param('id') id: number) {
        const t = await this.appService.deleteUnit(id, this.access_token);
        return t;
    }

    // ----------------------------------------------- product -----------------------------------------------

    @Post('additem')
    async addItem(@Body() dto: ItemDto) {
        const t = await this.appService.addItem(dto, this.access_token);
        return t;
    }

    @Get('getitem/:id')
    async getItem(@Param('id') id: number){
        const t = await this.appService.getItem(id, this.access_token);
        return t;
    }

    @Put('edititem/:id')
    async editItem(@Param('id') id: number, @Body() dto: ItemDto) {
        const t = await this.appService.editItem(id, dto, this.access_token);
        return t;
    }

    @Delete('deleteitem/:id')
    async deleteItem(@Param('id') id: number) {
        const t = await this.appService.deleteItem(id, this.access_token);
        return t;
    }
}
