"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyService = void 0;
const common_1 = require("@nestjs/common");
let LobbyService = class LobbyService {
    constructor() {
        this.rooms = new Map();
    }
    getRooms() {
        return this.rooms;
    }
    joinRoom(roomId, memberId) {
        let members = this.rooms.get(roomId);
        if (!members) {
            members = new Set();
            this.rooms.set(roomId, members);
        }
        members.add(memberId);
        return Array.from(members);
    }
    leaveRoom(roomId, memberId) {
        const members = this.rooms.get(roomId);
        if (members) {
            members.delete(memberId);
        }
        return Array.from(members);
    }
};
exports.LobbyService = LobbyService;
exports.LobbyService = LobbyService = __decorate([
    (0, common_1.Injectable)()
], LobbyService);
//# sourceMappingURL=lobby.service.js.map