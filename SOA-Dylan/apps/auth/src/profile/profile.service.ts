import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { ProfileDto } from './../../../../dto';
import { parse } from 'path';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService){}

    async getProfile(id: number): Promise<Profile> {
        id = parseInt(id.toString());
        const profile = await this.prisma.profile.findUnique({ where: { id } });
        delete profile.password;
        return profile;
    }

    async addProfile(dto: ProfileDto): Promise<Profile> {
        return await this.prisma.profile.create({ data: dto });
    }

    async editProfile(id: number, dto: ProfileDto): Promise<Profile> {
        id = parseInt(id.toString());
        const profile = await this.prisma.profile.update({ where: { id }, data: dto });
        delete profile.password;
        return profile;   
    }

    async deleteProfile(id: number): Promise<Profile> {
        id = parseInt(id.toString());
        return await this.prisma.profile.delete({ where: { id } });
    }
}
