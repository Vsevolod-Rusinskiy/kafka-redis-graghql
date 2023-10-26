import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas-mongoose/user.schema';
import { CreateUserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }
}
