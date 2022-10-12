import Player from "../../etc/player.js";

export default function run(socketServer, socket, msg, room) {
    socket.join(`room_${msg['room']}`);
    socket.emit('room_player_move', room[msg['room']].game.slotsArray)
    let player = new Player(msg['playerName'], socket.id);

    room[msg['room']].addPlayer(player);

    socket.to(`room_${msg['room']}`).emit("message", 'entrou na sala');
    socketServer.emit('data_lobby', room);
}