import { Model } from 'mongoose';
import { User } from './users.model';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "../dto/create-user.dto";
export declare class UsersService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    insertUser(userDTO: CreateUserDto): Promise<User>;
    login(loginUserDto: LoginUserDto): Promise<string>;
    findUserById(userId: string): Promise<User | null>;
    private generateToken;
    getAllUsers(page?: number, limit?: number): Promise<[User[], number]>;
}
