import { tttServer } from "../../js.js";

export default function run(socket, msg) {
    let socketServer = tttServer.getSocketServer();
    let room = tttServer.getRoom();

    room[msg['roomId']].getGame().playerMove(msg, socket);
    
    let dataToSend = {'game': room[msg['roomId']].getGame().getSlotsArray(), 'players': room[msg['roomId']].getPlayersName(),
     'score': room[msg['roomId']].getScore()};

    socketServer.to(`room_${msg['roomId']}`).emit('room_player_move', dataToSend)
}
