const table_room = document.getElementById('table_room');
const div_ttt = document.getElementById('ttt');
const div_lobby = document.getElementById('lobby');
const div_game = document.getElementById('game');
const table_game_players = document.getElementById('game_players');
let playerName = document.getElementById('playerName');
let h3_player_turn = document.getElementById('player_turn');
let roomId;

let slotsArray = [[document.getElementById('00'), document.getElementById('01'), document.getElementById('02')],
[document.getElementById('10'), document.getElementById('11'), document.getElementById('12')],
[document.getElementById('20'), document.getElementById('21'), document.getElementById('22')]];

var socket = io();

div_game.style.display = "none";

function playerMove(slot) {
    let room_player_move = { 'roomId': roomId, 'slotChanged': slot }

    socket.emit('room_player_move', room_player_move);
}

function joinRoom(number) {
    roomId = number;
    if(playerName.value == ''){
        alert('You must select a nickname')
        
        return null;
    }
    const data = { 'playerName': playerName.value, 'room': roomId };
    socket.emit('join_room', data);

    div_game.style.display = "";
    div_lobby.style.display = "none";
}

socket.on('data_lobby', function (data) {
    table_room.innerHTML = null;

    for(let i=0; i < data.length; i++){
        table_room.innerHTML += `
        <tr>
            <td>
                <p>${i}</p>
            </td>
      
            <td>
                <p>${data[i]}/2</p>
            </td>
            <td>
                <button onClick="joinRoom(${i})" class="btn btn-secondary">Join</button>
            </td>
        </tr>`;
    }
});

socket.on('room_player_move', function (data) {
    let board = data['game']
    let players = data['players']
    table_game_players.innerHTML = '';  

    if(data['player_turn']){
        h3_player_turn.innerHTML = data['player_turn'];
    }  
    
    for (let i = 0; i < players.length; i++) {
        table_game_players.innerHTML += `<tr>
            <td>
                <p>${players[i]}</p>
            </td>
            <td>
                <p id="player_score_${i}">${data['score'][i]}</p>
            </td>
        </tr>`
    }

    for (let i = 0; i <= 2; i++) {
        for (let b = 0; b <= 2; b++) {
            slotsArray[i][b].textContent = board[i][b];
        }
    }
});