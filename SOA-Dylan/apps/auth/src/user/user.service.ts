import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { error } from 'console';
import { NotFoundError } from 'rxjs';
import { PrismaService } from './../prisma/prisma.service';
import { UserDto } from '../../../../dto';
import { ProfileService } from './../profile/profile.service';

export interface UserProfile {
    id: number;
    profileId: number;
    name: string;
    email: string;
    unitsIds: number[];
}

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private profileService: ProfileService
    ) {}

    async getUser(id: number): Promise<UserProfile> {
        id = parseInt(id.toString());
        const user = await this.prisma.user.findUnique({ where: { id } });
        const profile = await this.prisma.profile.findUnique({ where: { id: user.profileId } });
        if (!user || !profile) throw new HttpException({
            message: 'Resource not found',
            error: 'Not Found',
            status: HttpStatus.NOT_FOUND,
        }, HttpStatus.NOT_FOUND, {
            cause: error
        })

        const userProfile: UserProfile = {
            id: user.id,
            profileId: user.profileId,
            name: profile.firstName + ' ' + profile.lastName,
            email: profile.email,
            unitsIds: user.unitsIds,
        }
        return userProfile;
    }

    async addUser(dto: UserDto) : Promise<UserProfile> {

        let profileId = parseInt(dto.profileId.toString(), 10);

        let unitsIds = dto.unitsIds;
        if (!unitsIds) unitsIds = [];
        for (let i = 0; i < unitsIds.length; i++) {
            unitsIds[i] = parseInt(unitsIds[i].toString());
        }

        const user = await this.prisma.user.create({
            data: {
                profile: {
                    connect: {
                        id: profileId
                    }
                },
                unitsIds: unitsIds
            }
        });
        
        const profile = await this.profileService.getProfile(profileId);

        const userProfile: UserProfile = {
            id: user.id,
            profileId: user.profileId,
            name: profile.firstName + ' ' + profile.lastName,
            email: profile.email,
            unitsIds: user.unitsIds,
        }

        return userProfile;
    }

    async editUser(id: number, dto: UserDto): Promise<UserProfile> {
        id = parseInt(id.toString());
        let user = await this.prisma.user.findUnique({ where: { id } });
        let profile = await this.prisma.profile.findUnique({ where: { id: user.profileId } });
        if (!user || !profile) throw new HttpException({
            message: 'Resource not found',
            error: 'Not Found',
            status: HttpStatus.NOT_FOUND,
        }, HttpStatus.NOT_FOUND, {
            cause: error
        })

        for (let i = 0; i < dto.unitsIds.length; i++) {
            dto.unitsIds[i] = parseInt(dto.unitsIds[i].toString());
        }

        user = await this.prisma.user.update({
            where: { id },
            data:
                {
                    unitsIds: dto.unitsIds
                }
        });

        const userProfile: UserProfile = {
            id: user.id,
            profileId: user.profileId,
            name: profile.firstName + ' ' + profile.lastName,
            email: profile.email,
            unitsIds: user.unitsIds,
        }

        return userProfile;
    }

    async deleteUser(id: number) : Promise<User> {
        id = parseInt(id.toString());
        let user: User;
        try {
            user = await this.prisma.user.delete({ where: { id } });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new HttpException({
                        message: 'User not found',
                        error: 'Not Found',
                        status: HttpStatus.NOT_FOUND,
                    }, HttpStatus.NOT_FOUND, {
                        cause: error
                    })
                }
            } else throw error;
        }
        return user;
    }
}
