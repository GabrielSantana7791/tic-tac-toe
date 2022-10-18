import Game from "./game.js";

export default class Room {
    #players;
    #data;
    #id;
    #game;

    constructor(id) {
        this.#players = [];
        this.#data;
        this.#id = id;
        this.#game = new Game(this);
    }

    addPlayer(player) {
        this.#players.push(player);
        if (this.#players.length >= 2 && this.#game.getEndGame() == true) {
            this.#game.startGame(this);
        }
    }

    rmvPlayer(socketId) {
        for (let i = 0; i < this.#players.length; i++) {
            if (this.#players[i].getSocket() == socketId) {
                this.#players.splice(i, 1);

                try {
                    if (this.#game.getPlayer1()['roomObj'].getSocket() == socketId || this.#game.getPlayer2()['roomObj'].getSocket() == socketId) {
                        if (this.#players.length >= 2) {
                            this.#game.startGame(this);
                        } else {
                            this.#game.setEndGame(true);
                            this.#game.resetBoard();
                        }
                    }
                } catch (error) {
                    console.log(`room.js_error: ${error}`);
                }
            }
        }
    }

    addScore(player){
        this.#players.forEach(element => {
            if(element == player){
                element.setScore(element.getScore() + 1);
            }
        });
    }

    getScore(){
        let score = [];

        for(let i=0; i<this.#players.length; i++){
            score.push(this.#players[i].getScore());
        }

        return score;
    }

    getPlayersName(){
        let playersName = [];

        this.#players.forEach(element => {
            playersName.push(element.getName());
        });
        
        return playersName;
    }

    getPlayers(){
        return this.#players;
    }

    setPlayers(players){
        this.#players = players;
    }

    getData(){
        return this.#data;
    }

    setData(data){
        this.#data = data;
    }

    getId(){
        return this.#id;
    }

    setId(id){
        this.#id = id;
    }

    getGame(){
        return this.#game;
    }

    setGame(game){
        this.#game = game;
    }
}