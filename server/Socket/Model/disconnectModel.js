export default function run(room, socket, socketServer) {
    for (let i = 0; i < room.length; i++) {
        room[i].rmvPlayer(socket.id);
        socketServer.to(`room_${i}`).emit('room_player_move', room[i].game.slotsArray)
    }
    socketServer.emit('data_lobby', room);
}