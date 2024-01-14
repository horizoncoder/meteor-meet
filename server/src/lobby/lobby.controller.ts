// src/lobby/lobby.controller.ts
import { Controller, Get } from '@nestjs/common';
import { LobbyService } from './lobby.service';

@Controller('lobby')
export class LobbyController {
    constructor(private readonly lobbyService: LobbyService) {}

    @Get()
    getLobbyInfo() {
        const rooms = this.lobbyService.getRooms();
        let sum = 0;
        rooms.forEach((members, roomId) => (sum = sum + members.size));
        return {
            rooms: rooms.size,
            members: sum,
        };
    }
}
