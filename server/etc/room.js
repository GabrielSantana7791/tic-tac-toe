import Game from "./game.js";

export default class Room {
    constructor(id) {
        this.players = [];
        this.data;
        this.id = id;
        this.game = new Game(this);
    }

    addPlayer(player) {
        this.players.push(player);
        if (this.players.length >= 2 && this.game.endGame == true) {
            this.game.startGame(this);
        }
    }

    rmvPlayer(socketId) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].socket == socketId) {
                this.players.splice(i, 1);

                try {
                    if (this.game.player1['roomObj'].socket == socketId || this.game.player2['roomObj'].socket == socketId) {
                        if (this.players.length >= 2) {
                            this.game.startGame(this);
                        } else {
                            this.game.endGame = true;
                            this.game.resetBoard();
                        }
                    }
                } catch (error) {
                    console.log(`room.js_error: ${error}`);
                }
            }
        }
    }
}