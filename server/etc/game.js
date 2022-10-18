export default class Game {
	#emptyText;
	#slotsArray;
	#player1;
	#player2;
	#playerTurn;
	#endGame;
	#room;

	constructor() {
		this.#emptyText = String.fromCharCode(160);
		this.#slotsArray = [[], [], []];
		this.#player1;
		this.#player2;
		this.#playerTurn;
		this.#endGame = true;

		this.resetBoard();
	}

	resetBoard() {
		this.#slotsArray = [[this.#emptyText, this.#emptyText, this.#emptyText], [this.#emptyText, this.#emptyText, this.#emptyText],
		[this.#emptyText, this.#emptyText, this.#emptyText]];
	}

	startGame(room) {
		this.#room = room;
		this.resetBoard();

		this.#endGame = false;
		this.#player1 = { 'roomObj': room.getPlayers()[0], 'mark': 'X' };
		this.#player2 = { 'roomObj': room.getPlayers()[1], 'mark': 'O' };
		this.#playerTurn = this.#player1; //deixar aleatorio dps
	}

	resetGame(){
		this.#slotsArray = [[this.#emptyText, this.#emptyText, this.#emptyText], [this.#emptyText, this.#emptyText, this.#emptyText],
		[this.#emptyText, this.#emptyText, this.#emptyText]];
	}

	playerMove(msg, socket) {

		if (this.#endGame == false && socket.id == this.#playerTurn['roomObj'].getSocket() &&
		this.#slotsArray[msg['slotChanged'][0]][msg['slotChanged'][1]] == this.#emptyText ) {
			this.#slotsArray[msg['slotChanged'][0]][msg['slotChanged'][1]] = this.#playerTurn['mark'];
			this.checkBoard();
			this.playerSelect();
		}
	}

	playerSelect() {
		switch (this.#playerTurn) {
			case this.#player1:
				this.#playerTurn = this.#player2;
				break;

			case this.#player2:
				this.#playerTurn = this.#player1;
				break;
		}
	}

	celebrate(){
		this.#room.addScore(this.#playerTurn['roomObj'])
		this.resetBoard();
	}

	checkBoard() {
		for (let i = 0; i <= 2; i++) {
			for (let b = 0; b <= 2; b++) {
				if (this.#slotsArray[i][b] == this.#playerTurn['mark']) {
					try {
						//diagonal  >>>
						if (this.#slotsArray[i + 1][b + 1] == this.#playerTurn['mark'] && this.#slotsArray[i + 2][b + 2] == this.#playerTurn['mark']) {
							this.celebrate();

							break;
						}
	
					} catch { }
	
					try {
						//diagonal <<<<
						if (this.#slotsArray[i - 1][b + 1] == this.#playerTurn['mark'] && this.#slotsArray[i - 2][b + 2] == this.#playerTurn['mark']) {
							this.celebrate();
	
							break;
						}
					} catch { }
	
					try {
						//column
						if (this.#slotsArray[i + 1][b] == this.#playerTurn['mark'] && this.#slotsArray[i + 2][b] == this.#playerTurn['mark']) {
							this.celebrate();
	
							break;
						}
					} catch { }
	
					try {
						//row
						if (this.#slotsArray[i][b + 1] == this.#playerTurn['mark'] && this.#slotsArray[i][b + 2] == this.#playerTurn['mark']) {
							this.celebrate();
	
							break;
						}
					} catch { }
				}
			}
		}
	}

	getEmptyText(){
		return this.#emptyText;
	}

	setEmptyText(emptyText){
		this.#emptyText = emptyText;
	}

	getSlotsArray(){
		return this.#slotsArray;
	}

	setSlotsArray(slotsArray){
		this.#slotsArray = slotsArray;
	}

	getPlayer1(){
		return this.#player1;
	}

	setPlayer1(player1){
		this.#player1 = player1;
	}

	getPlayer2(){
		return this.#player2;
	}

	setPlayer2(player2){
		this.#player2 = player2;
	}

	getPlayerTurn(){
		return this.#playerTurn;
	}

	set(playerTurn){
		this.#playerTurn = playerTurn;
	}

	getEndGame(){
		return this.#endGame;
	}

	setEndGame(endGame){
		this.#endGame = endGame;
	}
}