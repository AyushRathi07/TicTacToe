function player(name, char){
    return {
        name,
        char
    }
}

var player1 = player('A','X');
var player2 = player('B','O');


function checkwin(gameboard){
    for(var i=0;i<3;i++){
        if(gameboard[i][0] === gameboard[i][1] && gameboard[i][1] === gameboard[i][2]){
            if(gameboard[i][0] === 'X')
                return 10;
            else if(gameboard[i][0] === 'O')
                return -10;
        }
    }
    for(var i=0;i<3;i++){
        if(gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i]){
            if(gameboard[0][i] === 'X')
                return 10;
            else if(gameboard[0][i] === 'O')
                return -10;
        }
    }
    if(gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]){
        if(gameboard[0][0] === 'X')
            return 10;
        else if(gameboard[0][0] === 'O')
            return -10;
    }
    if(gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]){
        if(gameboard[0][2] === 'X')
            return 10;
        else if(gameboard[0][2] === 'O')
            return -10;
    }
    return 0;
}

function checktie(gameboard){
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(gameboard[i][j] === '')
                return false;
        }
    }
    return true;
}

function gameoverutil(gameboard){
    var score = checkwin(gameboard);
    if(score == 10){
        console.log("Player X");
        document.getElementById('turn').textContent = "Start a new game!";
        document.getElementById('warning').textContent = "Yuhuu !";
        gamestate.final_str = "Player X won!";
        gamestate.state = 1;
    }
    else if(score == -10){
        console.log("Player O");
        document.getElementById('turn').textContent = "Start a new game!";
        document.getElementById('warning').textContent = "Yuhuu !";
        gamestate.final_str = "Player O won!";
        gamestate.state = 1;
    }
    else{
        if(checktie(gameboard)){
            console.log("Game tied");
            document.getElementById('turn').textContent = "Start a new game!";
            document.getElementById('warning').textContent = "Happens everytime!";
            gamestate.final_str = "Game tied!";
            gamestate.state = 1;
        }
    }
}

var gamestate = {
    turn: 'X',
    gameboard: [['','',''],['','',''],['','','']],
    state : 0,
    init_str: "Game yet to start",
    mid_str: "Game in mid state, move or start a new game",
    final_str: "",
    checkgameover : function(){
        gameoverutil(this.gameboard);
    },
    handletexts: function(){
        if(document.getElementById('warning').textContent == "Invalid move, sir")
            document.getElementById('warning').textContent = "Good luck!";
        if(document.getElementById('state').textContent != this.mid_str && this.state == 0)
            document.getElementById('state').textContent = this.mid_str;
        if(this.state == 1)
            document.getElementById('state').textContent = this.final_str;
    },
    reset: function(){
        location.reload();
        // this.turn = 'X';
        // this.gameboard = [['','',''],['','',''],['','','']];
        // this.state = 0;
        // document.getElementById('state').textContent = this.init_str;
        // document.getElementById('turn').textContent = "Player X turn";
        // document.getElementById('warning').textContent = "";
        // var tds = document.querySelectorAll('td');
        // for(var i=0; i<tds.length; i++){
        //     tds[i].textContent = "";
        // }
    }
}

var tds = document.querySelectorAll('td');
for(var i=0; i<tds.length; i++){
    tds[i].addEventListener('click', function(event){
        var node = event.target;
        console.log(gamestate.state);
        if(gamestate.state === 1){
            document.getElementById('warning').textContent = "Please start a new game!" ;
            return;
        }
        if(node.textContent === 'X' || node.textContent === 'O'){
            document.getElementById('warning').textContent = "Invalid move, sir" ;
            return;
        }
        node.textContent = gamestate.turn;
        var tdid = node.id - '0';
        var row = parseInt((tdid-1) / 3);
        var col = ((tdid%3)+2)%3;
        //console.log(row,col);
        if(gamestate.turn === 'X'){
            document.getElementById('turn').textContent = "Player O turn";
            gamestate.turn = 'O';
            gamestate.gameboard[row][col] = 'X';
            node.style.background = '#101820FF';
        }
        else{
            document.getElementById('turn').textContent = "Player X turn";
            gamestate.turn = 'X';
            gamestate.gameboard[row][col] = 'O';
            node.style.background = '#F2AA4CFF';
        }
        gamestate.checkgameover();
        gamestate.handletexts();
    }) 

    
}

document.getElementById('newgamebutton').addEventListener('click', function(event){
    gamestate.reset();
})

