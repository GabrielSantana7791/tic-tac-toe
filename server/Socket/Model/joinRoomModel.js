import { tttServer } from "../../js.js";
import Player from "../../etc/player.js";

export default function run(socket, msg) {
    let socketServer = tttServer.getSocketServer();
    let room = tttServer.getRoom();

    socket.join(`room_${msg['room']}`);

    let player = new Player(msg['playerName'], socket.id);
    room[msg['room']].addPlayer(player);

    let dataToSend = {'game': room[msg['room']].getGame().getSlotsArray(), 'players': room[msg['room']].getPlayersName(),
    'score': room[msg['room']].getScore()};
    
    socket.emit('room_player_move', dataToSend)
    socketServer.to(`room_${msg['room']}`).emit("room_player_move", dataToSend)

    dataToSend = [];
      
    for(let i=0; i < room.length; i++){
      dataToSend.push(room[i].getPlayers().length);
    }
    socketServer.emit('data_lobby', dataToSend);
}