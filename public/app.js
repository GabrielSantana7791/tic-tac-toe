const table_room = document.getElementById('table_room');
const div_ttt = document.getElementById('ttt');
const div_lobby = document.getElementById('lobby');
const div_game = document.getElementById('game');
let playerName = document.getElementById('playerName');
let roomId;

let slotsArray = [[document.getElementById('00'), document.getElementById('01'), document.getElementById('02')],
[document.getElementById('10'), document.getElementById('11'), document.getElementById('12')],
[document.getElementById('20'), document.getElementById('21'), document.getElementById('22')]];

var socket = io();

div_game.style.display = "none";

function playerMove(slot){
    let room_player_move = {'roomId': roomId, 'slotChanged': slot}
    socket.emit('room_player_move', room_player_move);
}

function joinRoom(number) {
    roomId = number;
    const data = { 'playerName': playerName.value, 'room': number };
    socket.emit('join_room', data);

    div_game.style.display = "";
    div_lobby.style.display = "none";
}

socket.on('data_lobby', function (data) {
    table_room.innerHTML = null;

    data.forEach(element => {
        table_room.innerHTML += `
        <tr>
            <td>
                <p>${element.id}</p>
            </td>
      
            <td>
                <p>${element.players.length}/2</p>
            </td>
            <td>
                <button onClick="joinRoom(${element.id})">Join</button>
            </td>
        </tr>`;
    });
});

socket.on('room_player_move', function (data) {
    console.log(data)
    for(let i=0; i<=2; i++){
        for(let b=0; b<=2; b++){
            slotsArray[i][b].textContent = data[i][b];
        }
    }
});