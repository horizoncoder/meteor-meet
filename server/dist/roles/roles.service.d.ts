import { Model } from 'mongoose';
import { Role } from './roles.model';
export declare class RolesService {
    private readonly roleModel;
    constructor(roleModel: Model<Role>);
    initializeRoles(): Promise<void>;
}
