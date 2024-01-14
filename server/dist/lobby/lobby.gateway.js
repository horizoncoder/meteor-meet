"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const lobby_service_1 = require("./lobby.service");
const http_1 = require("http");
let LobbyGateway = class LobbyGateway {
    constructor(lobbyService) {
        this.lobbyService = lobbyService;
        this.logger = new common_1.Logger('LobbyGateway');
    }
    afterInit(server) {
        this.logger.log('WebSocket Gateway initialized');
        const signalServer = require('simple-signal-server')(server);
        signalServer.on('discover', (request) => {
            this.logger.log('discover');
            const memberId = request.socket.id;
            const roomId = request.discoveryData;
            const members = this.lobbyService.joinRoom(roomId, memberId);
            request.socket.roomId = roomId;
            request.discover({
                peers: Array.from(members),
            });
            this.logger.log('joined ' + roomId + ' ' + memberId);
        });
        signalServer.on('disconnect', (socket) => {
            const memberId = socket.id;
            const roomId = socket.roomId;
            const members = this.lobbyService.leaveRoom(roomId, memberId);
            this.logger.log('left ' + roomId + ' ' + memberId);
        });
        signalServer.on('request', (request) => {
            request.forward();
            this.logger.log('requested');
        });
    }
};
exports.LobbyGateway = LobbyGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", http_1.Server)
], LobbyGateway.prototype, "server", void 0);
exports.LobbyGateway = LobbyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH'] } }),
    __metadata("design:paramtypes", [lobby_service_1.LobbyService])
], LobbyGateway);
//# sourceMappingURL=lobby.gateway.js.map