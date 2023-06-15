/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Headers } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/schema/user.schema';
import { UpdateUserDto } from 'src/users/dto/update-user.do';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getAllUser(): Promise<User[]> {
        return this.authService.getAllUser()
    }

    @UseGuards(AuthGuard)
    @Get('validate')
    async validateUser(
      @Headers('authorization') bearerToken: string,
    ) {
      // Extract the token from the Authorization header
      const accessToken = bearerToken.replace('Bearer ', '');
  
      return this.authService.validateUser(accessToken);
    }
    @UseGuards(AuthGuard)
    @Get('/:id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.authService.getUserById(id);
    }
    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.authService.signUp(createUserDto);
    }

    @Post('signin')
    async login(@Body() createUserDto: CreateUserDto) {
        return await this.authService.signin(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return await this.authService.updateUser(id, updateUserDto);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return await this.authService.deleteuser(id);
    }
}
