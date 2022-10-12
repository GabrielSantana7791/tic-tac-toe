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
        joinRoom(this.socketServer, socket, msg, this.room);
      });

      socket.on('disconnect', () => {
        disconnect(this.room, socket, this.socketServer);
      })

      socket.on('room_player_move', msg => {
        roomPlayerMove(this.socketServer, socket, msg, this.room);
      })
    });
  }
}
