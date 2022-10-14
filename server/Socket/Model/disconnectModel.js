export default function run(room, socket, socketServer) {
    for (let i = 0; i < room.length; i++) {
        room[i].rmvPlayer(socket.id);
        let dataToSend = {'game': room[i].game.slotsArray, 'players': room[i].playersName()};
        socketServer.to(`room_${i}`).emit('room_player_move', dataToSend)
    }
    socketServer.emit('data_lobby', room);
}