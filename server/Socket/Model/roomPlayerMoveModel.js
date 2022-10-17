import { tttServer } from "../../js.js";

export default function run(socket, msg) {
    let socketServer = tttServer.socketServer;
    let room = tttServer.room;

    room[msg['roomId']].game.playerMove(msg, socket);
    
    let dataToSend = {'game': room[msg['roomId']].game.slotsArray, 'players': room[msg['roomId']].playersName()};

    socketServer.to(`room_${msg['roomId']}`).emit('room_player_move', dataToSend)
}
