import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Unit } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { UnitDto, UserDto } from '../../../../dto';
import { StorageService } from './../storage/storage.service';
import { StorageDto } from '../../../../dto';
import { UserService } from './../../../auth/src/user/user.service';

@Injectable()
export class UnitService {
    constructor(
        private prisma: PrismaService,
        private storageService: StorageService,
        private userService: UserService
    ) {}

    async getUnit(id: number): Promise<Unit> {
        id = parseInt(id.toString());
        const unit = await this.prisma.unit.findUnique({
            where: { id }
        });
        return unit;
    }

    async addUnit(dto: UnitDto): Promise<Unit> {
        dto.storageId = parseInt(dto.storageId.toString());
        if (dto.userId) dto.userId = parseInt(dto.userId.toString());

        if (dto.itemsIds) {
            for (let i = 0; i < dto.itemsIds.length; i++) {
                dto.itemsIds[i] = parseInt(dto.itemsIds[i].toString());
            }
        }

        const storage = await this.storageService.getStorage(dto.storageId);

        const storageDto: StorageDto = {
            name: storage.name,
            address: storage.address,
            unitsIds: []
        }

        dto.weightCapacity = parseFloat(dto.weightCapacity.toString());

        if (dto.weightCapacity <= 0) throw new BadRequestException(['Weight capacity must be greater than 0']);

        let unit = await this.prisma.unit.create({
            data: {
                weightCapacity: dto.weightCapacity,
                itemsIds: dto.itemsIds,
                storage: {
                    connect: {
                        id: dto.storageId
                    }
                }
            },
        });

        if (dto.userId) {
            unit = await this.prisma.unit.update({
                where: { id: unit.id },
                data: {
                    user: {
                        connect: {
                            id: dto.userId
                        }
                    }
                }
            });

            let user = await this.userService.getUser(dto.userId);
            const userDto: UserDto = {
                profileId: user.profileId,
                unitsIds: user.unitsIds ? [...user.unitsIds, unit.id] : [unit.id]
            }
            console.log('edituser')
            user = await this.userService.editUser(user.id, userDto);
        }

        storageDto.unitsIds = [...storage.unitsIds, unit.id];
        await this.storageService.editStorage(dto.storageId, storageDto);

        return unit;
    }

    async editUnit(id: number, dto: UnitDto): Promise<Unit> {
        id = parseInt(id.toString());
        dto.weightCapacity = parseFloat(dto.weightCapacity.toString());
        dto.storageId = parseInt(dto.storageId.toString());
        if (dto.userId) dto.userId = parseInt(dto.userId.toString());
        try {
            const unit = await this.prisma.unit.update({
                where: { id },
                data: {
                    weightCapacity: dto.weightCapacity,
                    user: {
                        connect: {
                            id: dto.userId
                        }
                    },
                    itemsIds: dto.itemsIds,
                    storage: {
                        connect: {
                            id: dto.storageId
                        }
                    }
                },
            });

            if (dto.userId) {
                let user = await this.userService.getUser(dto.userId);
                const userDto: UserDto = {
                    profileId: user.profileId,
                    unitsIds: user.unitsIds ? [...user.unitsIds, unit.id] : [unit.id]
                }
                user = await this.userService.editUser(user.id, userDto);
            }

            return unit;
        } catch (error) {
            throw new NotFoundException('Not found');
        }
    }

    async deleteUnit(id: number): Promise<Unit> {
        id = parseInt(id.toString());
        const unit = await this.prisma.unit.delete({where: { id }});
        if (unit.userId !== null) {
            let user = await this.userService.getUser(unit.userId);
            const userDto: UserDto = {
                profileId: user.profileId,
                unitsIds: user.unitsIds.filter((unitId) => unitId !== unit.id)
            }
            user = await this.userService.editUser(user.id, userDto);
        }
        return unit;
    }
}
