export default class Game {
	constructor() {
		this.emptyText = String.fromCharCode(160);
		this.slotsArray = [[], [], []];

		this.player1;
		this.player2;
		this.playerTurn;
		this.endGame = true;

		this.resetBoard();
	}

	resetBoard() {
		this.slotsArray = [[this.emptyText, this.emptyText, this.emptyText], [this.emptyText, this.emptyText, this.emptyText],
		[this.emptyText, this.emptyText, this.emptyText]];
	}

	startGame(room) {
		this.resetBoard();

		this.endGame = false;
		this.player1 = { 'roomObj': room.players[0], 'mark': 'X' };
		this.player2 = { 'roomObj': room.players[1], 'mark': 'O' };
		this.playerTurn = this.player1; //deixar aleatorio dps
	}

	playerMove(msg, socket) {

		if (this.endGame == false && socket.id == this.playerTurn['roomObj'].socket) {
			this.slotsArray[msg['slotChanged'][0]][msg['slotChanged'][1]] = this.playerTurn['mark'];
			this.playerSelect();
		}
	}

	playerSelect() {
		switch (this.playerTurn) {
			case this.player1:
				this.playerTurn = this.player2;
				break;

			case this.player2:
				this.playerTurn = this.player1;
				break;
		}
	}
}