import { LobbyService } from './lobby.service';
export declare class LobbyController {
    private readonly lobbyService;
    constructor(lobbyService: LobbyService);
    getLobbyInfo(): {
        rooms: number;
        members: number;
    };
}
