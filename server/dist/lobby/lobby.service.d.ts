export declare class LobbyService {
    private rooms;
    getRooms(): Map<any, any>;
    joinRoom(roomId: string, memberId: string): unknown[];
    leaveRoom(roomId: string, memberId: string): unknown[];
}
