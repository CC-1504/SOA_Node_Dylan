import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Storage } from '@prisma/client';
import { StorageDto } from '../../../../dto';

@Injectable()
export class StorageService {
    constructor(private prisma: PrismaService) {}

    async getStorage(id: number): Promise<Storage> {
        id = parseInt(id.toString());
        const storage = await this.prisma.storage.findUnique({ where: { id } });
        return storage;
    }

    async addStorage(dto: StorageDto): Promise<Storage> {
        const storage = await this.prisma.storage.create({ 
            data: {
                name: dto.name,
                address: dto.address,
                unitsIds: dto.unitsIds,
            }
        });
        return storage;
    }

    async editStorage(id: number, dto: StorageDto): Promise<Storage> {
        id = parseInt(id.toString());
        const storage = await this.prisma.storage.update({
            where: { id },
            data: {
                name: dto.name,
                address: dto.address,
                unitsIds: dto.unitsIds,
            }
        });
        return storage;
    }

    async deleteStorage(id: number): Promise<Storage> {
        id = parseInt(id.toString());
        const storage = await this.prisma.storage.delete({ where: { id } });
        return storage;
    }
}
