import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemDto } from '../../../../dto';
import { product } from '@prisma/client';
import { UnitService } from '../unit/unit.service';
import { UnitDto } from '../../../../dto';

@Injectable()
export class productService {
    constructor(
        private prisma: PrismaService,
        private unitService: UnitService
    ) {}

    async getItem(id: number): Promise<product> {
        id = parseInt(id.toString());
        const product = await this.prisma.product.findUnique({
            where: { id }
        });
        return product;
    }

    async addItem(dto: ItemDto): Promise<product> {
        const unit = await this.unitService.getUnit(dto.unitId);

        const unitDto: UnitDto = {
            weightCapacity: unit.weightCapacity - dto.weight,
            storageId: unit.storageId,
            userId: unit.userId,
            itemsIds: []
        }

        if (unitDto.weightCapacity < 0) {
            throw new BadRequestException();
        }

        dto.weight = parseFloat(dto.weight.toString());
        dto.unitId = parseInt(dto.unitId.toString());
        const product = await this.prisma.product.create({
            data: {
                name: dto.name,
                weight: dto.weight,
                unit: {
                    connect: { id: dto.unitId }
                }
            },
        });

        unitDto.itemsIds = [...unit.itemsIds, product.id];

        await this.unitService.editUnit(dto.unitId, unitDto);
        return product;
    }

    async editItem(id: number, dto: ItemDto): Promise<product> {

        const unit = await this.unitService.getUnit(dto.unitId);

        id = parseInt(id.toString());
        dto.weight = parseFloat(dto.weight.toString());
        dto.unitId = parseInt(dto.unitId.toString());

        if (unit.weightCapacity < dto.weight) {
            throw new BadRequestException();
        }

        let product;
        try {
            product = await this.prisma.product.update({
                where: { id },
                data: {
                    name: dto.name,
                    weight: dto.weight,
                    unit: {
                        connect: { id: dto.unitId }
                    }
                },
            });
        } catch (error) {
            throw new NotFoundException();
        }
        return product;
    }

    async deleteItem(id: number) {
        id = parseInt(id.toString());
        const product = await this.prisma.product.delete({
            where: { id }
        });
        return product;
    }
}
