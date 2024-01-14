import { Model } from 'mongoose';
import { User } from './users.model';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    insertUser(name: string, email: string, surname: string, password: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
}
