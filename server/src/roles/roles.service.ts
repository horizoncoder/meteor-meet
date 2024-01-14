// roles/roles.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}

    async initializeRoles() {
        const roleCount = await this.roleModel.countDocuments({});

        if (roleCount < 2) {
            await this.roleModel.create({ roleId: 2, roleName: 'user' });
            await this.roleModel.create({ roleId: 1, roleName: 'admin' });
            console.log('Roles added to the database.');
        }
    }
}
