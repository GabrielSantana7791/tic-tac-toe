export default function run(socketServer, socket, msg, room) {
    room[msg['roomId']].game.playerMove(msg, socket);
    
    let dataToSend = {'game': room[msg['roomId']].game.slotsArray, 'players': room[msg['roomId']].playersName()};

    socketServer.to(`room_${msg['roomId']}`).emit('room_player_move', dataToSend)
}
