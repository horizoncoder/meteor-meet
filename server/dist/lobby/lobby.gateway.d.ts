/// <reference types="node" />
import { OnGatewayInit } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { LobbyService } from './lobby.service';
import { Server } from 'http';
export declare class LobbyGateway implements OnGatewayInit {
    private readonly lobbyService;
    server: Server;
    private logger;
    constructor(lobbyService: LobbyService);
    afterInit(server: Namespace): void;
}
