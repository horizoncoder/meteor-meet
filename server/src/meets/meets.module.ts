// meets/meets.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetsController } from './meets.controller';
import { MeetsService } from './meets.service';
import { MeetsSchema } from './meets.model';
import {OrganizationService} from "../organizations/organization.service";
import {OrganizationSchema} from "../organizations/organizations.model";
import {UsersService} from "../users/users.service";
import {UserSchema} from "../users/users.model";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Meets', schema: MeetsSchema }, {name: 'organization', schema: OrganizationSchema}, { name: 'user', schema: UserSchema }]),
    ],
    controllers: [MeetsController],
    providers: [MeetsService, OrganizationService, UsersService, JwtService],
})
export class MeetsModule {}
