import { Logger } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { LobbyService } from './lobby.service';
import { Server } from 'http';

@WebSocketGateway({ cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH'] } })
export class LobbyGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('LobbyGateway');

    constructor(private readonly lobbyService: LobbyService) {}

    afterInit(server: Namespace) {
        this.logger.log('WebSocket Gateway initialized');
        const signalServer = require('simple-signal-server')(server)

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
}
