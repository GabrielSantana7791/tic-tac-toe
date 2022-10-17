import { tttServer } from "../../js.js";

export default function run(socket) {
    let socketServer = tttServer.socketServer;
    let room = tttServer.room;

    for (let i = 0; i < room.length; i++) {
        room[i].rmvPlayer(socket.id);
        let dataToSend = {'game': room[i].game.slotsArray, 'players': room[i].playersName()};
        socketServer.to(`room_${i}`).emit('room_player_move', dataToSend)
    }
    socketServer.emit('data_lobby', room);
}