// app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Добавьте импорт ConfigModule
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LobbyModule } from './lobby/lobby.module';
import { RolesModule } from './roles/roles.module';
import { OrganizationsModule } from "./organizations/organizations.module";
import {MeetsModule} from "./meets/meets.module";

@Module({
  imports: [
    ConfigModule.forRoot(), 
    UsersModule,
    RolesModule,
    OrganizationsModule,
    MeetsModule,
    AuthModule,
    LobbyModule,
    MongooseModule.forRoot(
        //TODO move to env 
        'mongodb+srv://idbelimenko:meet19092001@cluster0.jhwargb.mongodb.net/'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
