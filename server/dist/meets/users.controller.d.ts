import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    addUser(password: string, email: string, surname: string, name: string): Promise<{
        msg: string;
        userId: any;
        userName: string;
    }>;
    login(req: any): any;
    getHello(req: any): string;
    logout(req: any): any;
}
