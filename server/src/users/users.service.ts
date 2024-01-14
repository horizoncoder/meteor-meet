// users.service.ts

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './users.model';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
      @InjectModel('user') private readonly userModel: Model<User>,
      private readonly jwtService: JwtService,
  ) {}

  async insertUser(userDTO: CreateUserDto): Promise<User> {
    const { password, ...userWithoutPassword } = userDTO;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      ...userWithoutPassword,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const { email, password } = loginUserDto;
    const user: any = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
console.log({ id: user._id, email: user.email, roleId: user.roleId})
    return this.generateToken({ id: user._id, email: user.email, roleId: user.roleId});
  }
  async findUserById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();

  }

  private generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
  async getAllUsers(page: number = 1, limit: number = 10): Promise<[User[], number]> {
    const skip = (page - 1) * limit;
    const users = await this.userModel.find().skip(skip).limit(limit).exec();
    const total = await this.userModel.countDocuments(); // Получение общего количества пользователей

    return [users, total];
  }
}
