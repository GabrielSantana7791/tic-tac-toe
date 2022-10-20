import { tttServer } from "../../js.js";

export default function run(socket) {
    let socketServer = tttServer.getSocketServer();
    let room = tttServer.getRoom();

    for (let i = 0; i < room.length; i++) {
        room[i].rmvPlayer(socket.id);
        let dataToSend = {'game': room[i].getGame().getSlotsArray(), 'players': room[i].getPlayersName(),
        'score': room[i].getScore(), 'player_turn': room[i].getGame().getPlayerTurnMessage()};
        socketServer.to(`room_${i}`).emit('room_player_move', dataToSend)
    }

   let dataToSend = [];
      
    for(let i=0; i < room.length; i++){
      dataToSend.push(room[i].getPlayers().length);
    }
    socketServer.emit('data_lobby', dataToSend);
}