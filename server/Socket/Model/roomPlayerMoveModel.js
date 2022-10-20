import { tttServer } from "../../js.js";

export default function run(socket, msg) {
    let socketServer = tttServer.getSocketServer();
    let room = tttServer.getRoom();

    room[msg['roomId']].getGame().playerMove(msg, socket);
    //room[msg['roomId']].getGame().emitPlayerTurn();
    
    let dataToSend = {'game': room[msg['roomId']].getGame().getSlotsArray(), 'players': room[msg['roomId']].getPlayersName(),
     'score': room[msg['roomId']].getScore(), 'player_turn': room[msg['roomId']].getGame().getPlayerTurnMessage()};

    socketServer.to(`room_${msg['roomId']}`).emit('room_player_move', dataToSend)
}
