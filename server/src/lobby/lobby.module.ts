// src/lobby/lobby.module.ts
import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyController } from './lobby.controller';
import { LobbyGateway } from './lobby.gateway';

@Module({
    providers: [LobbyService, LobbyGateway],
    controllers: [LobbyController],
})
export class LobbyModule {}
