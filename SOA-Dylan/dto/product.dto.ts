import { Unit } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class ItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPositive()
    @IsNotEmpty()
    weight: number;

    @IsOptional()
    unit: Unit;

    @IsOptional()
    unitId: number;
}