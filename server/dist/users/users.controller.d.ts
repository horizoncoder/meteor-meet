import { UsersService } from './users.service';
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(createUserDto: CreateUserDto): Promise<{
        user: import("./users.model").User;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    getMe(req: any): Promise<{
        id: string;
        name: any;
        email: string;
        surname: any;
        role: string;
    }>;
    admin(): Promise<string>;
    getAllUsers(page?: number, limit?: number): Promise<{
        data: import("./users.model").User[];
        pagination: {
            total: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
}
