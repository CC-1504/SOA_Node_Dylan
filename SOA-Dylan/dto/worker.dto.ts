import { worker } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class workerDto {
    @IsDateString()
    @IsNotEmpty()
    employmentDate: Date;

    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    profileId: number;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    managerId: number;

    @IsOptional()
    manager: worker;

    @IsOptional()
    workers: worker[];
}