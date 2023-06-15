/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.do';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../auth/strategy/refresh_token'
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private JwtService: JwtService,
        private TokenRefresh: TokenService
    ) { }


    async getAllUser(): Promise<User[]> {
        return this.userModel.find().exec()
    }
    async getuserByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({
            username: username
        }).exec()
    }
    async getUserById(id: string): Promise<User> {
        const query: { [key: string]: any } = {}
        if (!id) {
            throw new NotFoundException(`No User with ID = ${id}`)
        }
        query.usernameId = id
        return await this.userModel.findOne(query).exec()
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password } = createUserDto;
        if (!username || !password) {
            throw new NotFoundException(`Information missing to create user`)
        }
        const user = new this.userModel({
            usernameId: uuidv4(),
            username,
            password,
        });
        return user.save()
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const { username, password } = updateUserDto;
        const query: { [key: string]: any } = {}
        if (username) query.username = username;
        if (password) query.password = password;
        try {
            const updateTask = await this.userModel.findOneAndUpdate(
                { usernameId: id },
                { $set: query },
                { new: true },
            );
            if (updateTask) {
                return updateTask;
            }
        } catch (err) {
            throw new NotFoundException(`user with ID = ${id} not found`)
        }
    }

    async deleteUser(id: string): Promise<User> {
        if (!id) {
            throw new NotFoundException(`user with ID = ${id} not found`)
        }
        return await this.userModel.findOneAndDelete({
            usernameId: id
        }).exec()
    }

    validateUser(accessToken: string): string {
        try {
            const decodedToken = this.JwtService.verify(accessToken);
            const userId = decodedToken.sub;

            // Validate the user or perform additional checks if needed
            const user = this.userModel.findOne({
                usernameId: userId
            })
            if (user) {

                // Generate a new refresh token
                const refreshToken = this.TokenRefresh.generateRefreshToken(userId);
                return refreshToken;
            }

        } catch (error) {
            return null;
        }
    }

}
