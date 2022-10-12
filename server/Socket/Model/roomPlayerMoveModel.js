export default function run(socketServer, socket, msg, room) {
    room[msg['roomId']].game.playerMove(msg, socket);
    socketServer.to(`room_${msg['roomId']}`).emit('room_player_move', room[msg['roomId']].game.slotsArray)
}
