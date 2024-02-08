import { Profile } from "@prisma/client";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    profileId: number;

    @IsOptional()
    unitsIds: number[];
}