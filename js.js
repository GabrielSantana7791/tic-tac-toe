let slotsArray = [[document.getElementById('00'), document.getElementById('01'), document.getElementById('02')],
[document.getElementById('10'), document.getElementById('11'), document.getElementById('12')],
[document.getElementById('20'), document.getElementById('21'), document.getElementById('22')]];

const checkbox_selectO = document.getElementById('selectO');
const checkbox_selectX = document.getElementById('selectX');
const checkbox_playAlone = document.getElementById('playAlone');
const button_reset = document.getElementById('reset');
const msg = document.getElementById('msg');

let player = 'X', player2 = 'O', player1 = 'X';
let emptyTextContent = String.fromCharCode(160);
let endGame = true, AIactivated = false;

function beginGame() {
	checkbox_selectO.disabled = true;
	checkbox_selectX.disabled = true;
	checkbox_playAlone.disabled = true;
	endGame = false;
	button_reset.disabled = false;
}

function activeAI(){
	AIactivated = !AIactivated;
}

function playerSelect(selection) {
	switch (selection.value) {
		case 'selectO':
			checkbox_selectX.checked = false;
			player1 = 'O';
			player2 = 'X';
			player = player1;

			break;
		case 'selectX':
			checkbox_selectO.checked = false;
			player1 = 'X';
			player2 = 'O';
			player = player1;

			break;
	}
}

function changePlayer() {
	if (endGame == false) {
		switch (player) {
			case player1:
				player = player2;

				break;
			case player2:
				player = player1;

				break;
		}
	}
}

function playerMove(doc) {
	const valor = doc.textContent;
	if (valor == emptyTextContent && endGame == false) {
		doc.textContent = player;

		checkBoard();
		changePlayer();

		if(AIactivated == true){
			AImove();
		}	
	}
}

function celebrate() {
	endGame = true;

	msg.textContent = `Player"${player}" won.`;
}

function resetBoard() {
	endGame = false;

	player = player1;

	slotsArray.forEach((element) => {
		element.forEach((subelement) => {
			subelement.textContent = emptyTextContent;
		});
	});
}

function AImove() {
	if (endGame == false) {

		try {
			AICheck().textContent = player2;
		} catch { }

		checkBoard();
		changePlayer();
	}
}

function AICheck() {
	let emptySlots = [];
	let emptySlotSelected;

	//Column
	try {
		for (let i = 0; i <= 2; i++) {
			let slotTemp = [];
			let slotTempEmpty;

			for (let b = 0; b <= 2; b++) {
				switch (slotsArray[b][i].textContent) {
					case player1:
						slotTemp[slotTemp.length] = slotsArray[b][i]

						break;
					case emptyTextContent:
						slotTempEmpty = slotsArray[b][i]

						break;
				}
			}
			if (slotTemp.length == 2 && slotTempEmpty) {
				return slotTempEmpty;
			}
		}
	} catch { }

	//row
	try {
		for (let i = 0; i <= 2; i++) {
			let slotTemp = [];
			let slotTempEmpty;

			for (let b = 0; b <= 2; b++) {
				switch (slotsArray[i][b].textContent) {
					case player1:
						slotTemp[slotTemp.length] = slotsArray[i][b]

						break;
					case emptyTextContent:
						slotTempEmpty = slotsArray[i][b]

						break;
				}
			}
			if (slotTemp.length == 2 && slotTempEmpty) {
				return slotTempEmpty;
			}
		}
	} catch { }

	//diag up down
	try {
		let slotDiag = [slotsArray[0][0], slotsArray[1][1], slotsArray[2][2]];
		let slotTemp = [];
		let slotTempEmpty;

		for (let i = 0; i <= 2; i++) {
			switch (slotDiag[i].textContent) {
				case player1:
					slotTemp[slotTemp.length] = slotDiag[i]

					break;
				case emptyTextContent:
					slotTempEmpty = slotDiag[i];

					break;
			}
		}
		if (slotTemp.length == 2 && slotTempEmpty) {
			return slotTempEmpty;
		}
	} catch { }

	//diag down up
	try {
		let slotDiag = [slotsArray[2][0], slotsArray[1][1], slotsArray[0][2]];
		let slotTemp = [];
		let slotTempEmpty;

		for (let i = 0; i <= 2; i++) {
			switch (slotDiag[i].textContent) {
				case player1:
					slotTemp[slotTemp.length] = slotDiag[i]

					break;
				case emptyTextContent:
					slotTempEmpty = slotDiag[i];

					break;
			}
		}
		if (slotTemp.length == 2 && slotTempEmpty) {
			return slotTempEmpty;
		}
	} catch { }

	try {
		//Random slot
		slotsArray.forEach((element) => {
			element.forEach((subElement) => {
				if (subElement.textContent == emptyTextContent) {
					emptySlots[emptySlots.length] = subElement;
				}
			});
		});

		emptySlotSelected = emptySlots[Math.floor(Math.random() * emptySlots.length)];
		return emptySlotSelected;

	} catch { }
}

function checkBoard() {
	for (let i = 0; i <= 2; i++) {
		for (let b = 0; b <= 2; b++) {
			if (slotsArray[i][b].textContent == player) {
				try {
					//teste coluna X >
					if (slotsArray[i + 1][b + 1].textContent == player && slotsArray[i + 2][b + 2].textContent == player) {

						celebrate();
						break;
					}

				} catch { }

				try {
					//teste coluna X <
					if (slotsArray[i - 1][b + 1].textContent == player && slotsArray[i - 2][b + 2].textContent == player) {
						celebrate();

						break;
					}
				} catch { }

				try {
					//teste coluna VERTICAL
					if (slotsArray[i + 1][b].textContent == player && slotsArray[i + 2][b].textContent == player) {
						celebrate();

						break;
					}
				} catch { }

				try {
					//teste coluna HORIZONTAL
					if (slotsArray[i][b + 1].textContent == player && slotsArray[i][b + 2].textContent == player) {
						celebrate();

						break;
					}
				} catch { }
			}
		}
	}
}