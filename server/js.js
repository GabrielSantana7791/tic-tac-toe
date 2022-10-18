import TTTServer from './tttServer.js'
import Controller from './Http/Controller/Controller.js';
import SocketController from './Socket/Controller/socketController.js';

export const tttServer = new TTTServer();
export const httpController = new Controller();

tttServer.run();
httpController.run();

const socketController = new SocketController();
socketController.run();