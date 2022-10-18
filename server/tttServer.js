import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Room from './etc/room.js';


export default class TTTServer {
  #app;
  #httpServer;
  #socketServer;
  #port;
  #room;

  constructor() {
    this.#app = express();
    this.#httpServer = http.Server(this.#app);
    this.#socketServer = new Server(this.#httpServer);
    this.#port = 8080;
    this.#room = [];
  }

  run() {
    const room1 = new Room(0);
    const room2 = new Room(1);

    this.#room = [room1, room2];

    this.#httpServer.listen(this.#port, () => {
      console.log(`Server running at port ${this.#port}`)
    });
  }

  getApp(){
    return this.#app;
  }

  setApp(app){
    this.#app = app;
  }

  getHttpServer(){
    return this.#httpServer;
  }

  setHttpServer(httpServer){
    this.#httpServer = httpServer;
  }

  getSocketServer(){
    return this.#socketServer
  }

  setSocketServer(socketServer){
    this.#socketServer = socketServer;
  }

  getPort(){
    return this.#port;
  }

  getRoom(){
    return this.#room;
  }

  setRoom(room){
    this.#room = room;
  }
}