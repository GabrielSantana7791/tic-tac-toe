import { tttServer } from "../../js.js";
import roomPlayerMove from "../Model/roomPlayerMoveModel.js"
import disconnect from "../Model/disconnectModel.js"
import joinRoom from "../Model/joinRoomModel.js"

export default class SocketController {
  #socketServer;
  #room;

  constructor() {
    this.#socketServer = tttServer.getSocketServer();
    this.#room = tttServer.getRoom();
  }

  run() {
    this.#socketServer.on('connection', (socket) => {
      let dataToSend = [];
      
      for(let i=0; i < this.#room.length; i++){
        dataToSend.push(this.#room[i].getPlayers().length);
      }

      socket.emit('data_lobby', dataToSend);
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
