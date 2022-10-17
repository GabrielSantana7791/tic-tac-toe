import { tttServer } from "../../js.js";
import roomPlayerMove from "../Model/roomPlayerMoveModel.js"
import disconnect from "../Model/disconnectModel.js"
import joinRoom from "../Model/joinRoomModel.js"

export default class SocketController {
  constructor() {
    this.socketServer = tttServer.socketServer;
    this.room = tttServer.room;
  }

  run() {
    this.socketServer.on('connection', (socket) => {
      socket.emit('data_lobby', this.room);

      socket.on('join_room', msg => {
        joinRoom(socket, msg);
      });

      socket.on('disconnect', () => {
        disconnect(socket);
      })

      socket.on('room_player_move', msg => {
        roomPlayerMove(socket, msg);
      })
    });
  }
}
