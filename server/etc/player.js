export default class Player {
    #name;
    #score = 0;
    #socket;

    constructor(name, socket) {
        this.#name = name;
        this.#socket = socket;
    }

    getScore(){
        return this.#score;
    }

    setScore(score){
        this.#score = score;
    }

    getName(){
        return this.#name;
    }

    setName(name){
        this.#name = name;
    }

    getSocket(){
        return this.#socket;
    }

    setSocket(socket){
        this.#socket = socket;
    }
}