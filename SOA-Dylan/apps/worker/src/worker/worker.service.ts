import { Injectable } from '@nestjs/common';
import { worker } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { workerDto } from '../../../../dto';

@Injectable()
export class workerService {
    constructor(private prisma: PrismaService) {}

    async getworker(id: number): Promise<worker> {
        id = parseInt(id.toString());
        const worker = await this.prisma.worker.findUnique({ where: { id } });
        return worker;
    }

    async addworker(dto: workerDto): Promise<worker> {
        dto.profileId = parseInt(dto.profileId.toString());
        if (dto.managerId) {
            dto.managerId = parseInt(dto.managerId.toString());
            return this.prisma.worker.create({ 
                data: {
                    employmentDate: dto.employmentDate,
                    profile:{
                        connect: {
                            id: dto.profileId
                        }
                    },
                    manager: {
                        connect: {
                            id: dto.managerId
                        }
                    },
                }
            });
        } else {
            return this.prisma.worker.create({ 
                data: {
                    employmentDate: dto.employmentDate,
                    profileId: dto.profileId,
                }
            });
        }
    }

    async editworker(id: number, dto: workerDto): Promise<worker> {
        id = parseInt(id.toString());
        if (dto.managerId) {
            dto.managerId = parseInt(dto.managerId.toString());
        }
        const worker = await this.prisma.worker.update({
            where: { id },
            data: {
                employmentDate: dto.employmentDate,
                managerId: dto.managerId,
            }
        });
        return worker;
    }

    async deleteworker(id: number): Promise<worker> {
        id = parseInt(id.toString());
        const worker = await this.prisma.worker.delete({ where: { id } });
        return worker;
    }
}
