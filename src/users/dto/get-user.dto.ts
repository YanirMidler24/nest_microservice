/* eslint-disable prettier/prettier */
import { IsOptional } from "class-validator";

export class GetUserDto {
    @IsOptional()
    username: string;

    @IsOptional()
    usernameId: string;
}