/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.do';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private JwtService: JwtService,
    ) { }

    async getAllUser(): Promise<User[]> {
        return this.userService.getAllUser();
    }

    async getUserById(id: string): Promise<User> {
        return await this.userService.getUserById(id);
    }
    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }

    async deleteuser(id: string): Promise<User> {
        return this.userService.deleteUser(id);
    }

    async signin(createUserDto: CreateUserDto) {
        const { username, password } = createUserDto;
        if (!username || !password) {
            throw new Error('username or password missing');
        }
        const user = await this.userService.getuserByUsername(username);
        console.log(user);

        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.usernameId, username: user.username };
        const access_token = await this.JwtService.signAsync(payload)
        return {
            access_token
        };
    }
    async validateUser(access_token: string): Promise<string> {
        const response = await this.userService.validateUser(access_token);
        return response;
    }
}
