// users.controller.ts

import {Controller, Post, Body, ValidationPipe, UseGuards, Get, Req, NotFoundException, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "../dto/create-user.dto";
import {LoginUserDto} from "../dto/login-user.dto";
import {JwtAuthGuard} from "../guard/jwt-auth.guard";
import {AdminGuard} from "../guard/admin.guard";


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  async signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.usersService.insertUser(createUserDto);
    return { user};
  }

  @Post('sign-in')
  async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    const token = await this.usersService.login(loginUserDto);
    return { token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req) {
    console.log(req.user)
    const userId = req.user.id;
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    //@ts-ignore
    const role = user.roleId === 1 ? 'admin' : 'user'
    //@ts-ignore
    return { id: user._id, name: user.name, email: user.email, surname: user.surname, role };
  }
  @Get('admin')
  @UseGuards(AdminGuard)
  async admin() {
    return "You are admin"
  }
  @Get('all')
  async getAllUsers(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
  ) {
    const [users, total] = await this.usersService.getAllUsers(page, limit);

    // @ts-ignore
    const totalPages = Math.ceil(total / limit);

    return {
   data:   users,
   pagination:{
     total,
     totalPages,
     currentPage: page,
   }

    };
  }
}
