import { tttServer } from "../../js.js";
import Player from "../../etc/player.js";

export default function run(socket, msg) {
    let socketServer = tttServer.socketServer;
    let room = tttServer.room;

    socket.join(`room_${msg['room']}`);

    let player = new Player(msg['playerName'], socket.id);
    room[msg['room']].addPlayer(player);

    let dataToSend = {'game': room[msg['room']].game.slotsArray, 'players': room[msg['room']].playersName()};
    
    socket.emit('room_player_move', dataToSend)
    socketServer.to(`room_${msg['room']}`).emit("room_player_move", dataToSend)
    socketServer.emit('data_lobby', room);
}