let slotsArray = [[document.getElementById('00'), document.getElementById('01'), document.getElementById('02')],
[document.getElementById('10'), document.getElementById('11'), document.getElementById('12')],
[document.getElementById('20'), document.getElementById('21'), document.getElementById('22')]];

let player = 'X';
let endGame = false;
const msg = document.getElementById('msg');

AImove();
function changePlayer() {
	if (player == 'X') {
		player = 'O';
	} else {
		player = 'X';
	}
}

function playerMove(doc) {
	const valor = doc.textContent;
	if (valor == String.fromCharCode(160) && endGame == false) {
		doc.textContent = player;

		checkBoard();
		changePlayer();
		AImove();

	}
}

function celebrate() {
	endGame = true;

	msg.textContent = `Player"${player}" won.`;
}

function resetBoard() {
	endGame = false;

	slotsArray.forEach((element) => {
		element.forEach((subelement) => {
			subelement.textContent = String.fromCharCode(160);
		});
	});
}

function AImove() {
	let emptySlots = [];
	let emptySlotSelected;

	if(endGame == true){
		return null;
	}

	try {
		slotsArray.forEach((element) => {
			element.forEach((subElement) => {
				if (subElement.textContent == String.fromCharCode(160)) {
					emptySlots[emptySlots.length] = subElement;
				}
			});
		});

		emptySlotSelected = emptySlots[Math.floor(Math.random() * emptySlots.length)];
		emptySlotSelected.textContent = player;

		changePlayer();
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

				} catch {
				}

				try {
					//teste coluna X <
					if (slotsArray[i - 1][b + 1].textContent == player && slotsArray[i - 2][b + 2].textContent == player) {
						celebrate();
						break;
					}
				} catch {
				}

				try {
					//teste coluna VERTICAL
					if (slotsArray[i + 1][b].textContent == player && slotsArray[i + 2][b].textContent == player) {
						celebrate();
						break;
					}
				} catch {
				}

				try {
					//teste coluna HORIZONTAL
					if (slotsArray[i][b + 1].textContent == player && slotsArray[i][b + 2].textContent == player) {
						celebrate();
						break;
					}
				} catch {
				}

				try {
					//empate
					if (slotsArray[i][b + 1].textContent == player && slotsArray[i][b + 2].textContent == player) {
						celebrate();
						break;
					}
				} catch {
				}
			}
		}
	}
}