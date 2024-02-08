import { Unit } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StorageDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsOptional()
    unitsIds: number[];
}