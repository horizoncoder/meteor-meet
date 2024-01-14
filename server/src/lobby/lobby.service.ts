// src/lobby/lobby.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class LobbyService {
    private rooms = new Map();

    getRooms() {
        return this.rooms;
    }

    joinRoom(roomId: string, memberId: string) {
        let members = this.rooms.get(roomId);
        if (!members) {
            members = new Set();
            this.rooms.set(roomId, members);
        }
        members.add(memberId);
        return Array.from(members);
    }

    leaveRoom(roomId: string, memberId: string) {
        const members = this.rooms.get(roomId);
        if (members) {
            members.delete(memberId);
        }
        return Array.from(members);
    }
}
