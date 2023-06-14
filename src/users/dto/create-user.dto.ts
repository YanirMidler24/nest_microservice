/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    usernameId: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password:string;
}