// roles/roles.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './roles.model';
import { RolesService } from './roles.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule {}
