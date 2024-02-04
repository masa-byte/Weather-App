import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async users() {
        try {
            const users = await this.userService.getAllUsers()
            return users
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

    @Get(':id')
    async user(@Param('id') id: string) {
        try {
            const user = await this.userService.getUserById(id)
            return user
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

    @Get('email/:email')
    async userByEmail(@Param('email') email: string) {
        try {
            const user = await this.userService.getUserByEmail(email)
            return user
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

    @Get('compare-password/:password/:id')
    async comparePassword(@Param('password') password: string, @Param('id') id: string): Promise<boolean> {
        try {
            const res = await this.userService.comparePassword(password, id)
            return res
        } catch (error) {
            return false
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body('user') user: any) {
        try {
            const res = await this.userService.updateUser(user)
            return res
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            const res = await this.userService.deleteUser(id)
            return res
        } catch (error) {   
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
    }
}
