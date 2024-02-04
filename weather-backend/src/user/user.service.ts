import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email: email }).exec();
    }

    async createUser(user: any): Promise<User> {
        user.type = Role.User;
        let userToCreate = {
            ...user,
            dateCreated: new Date().toISOString(),
        };
        const newUser = new this.userModel(userToCreate);
        return newUser.save();
    }

    async deleteUser(id: string) {
        // soft delete
        const user = await this.userModel.findById(id).exec();
        user.deleted = true;
        user.save();
        return
    }

    async updateUser(user: any): Promise<User> {
        const userToUpdate = await this.userModel.findByIdAndUpdate(user.id, user, { new: true }).exec();
        return userToUpdate;
    }

    async comparePassword(password: string, id: string): Promise<boolean> {
        const user = await this.userModel.findById(id).exec();
        return user.comparePassword(password);
    }
}
