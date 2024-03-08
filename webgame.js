function changeColor(){
  var x = document.getElementById('H');    
  x.style.color="red";  
}
function endGame(message) {
    document.getElementById("createboard").style.display = "none";  
    document.getElementById("playerchoice").style.display = "none";
    document.getElementById("button").style.display = "none";
    var x = document.createElement('div');                           
    x.id = "winnermessage";
    x.style.display = "flex";
    x.style.flexDirection = "column"; 
    x.style.justifyContent = "center";
    x.style.alignItems = "center";
    x.style.position = "fixed";
    x.style.top = "50%";
    x.style.left = "50%";
    x.style.transform = "translate(-50%, -50%)";
    x.style.width = "250px";
    x.style.height = "250px";
    x.style.backgroundColor = "white";
    x.style.border = "2px solid black";
    x.style.outline = "2px solid white";
    x.classList.add('fade-in');
    var winnerText = document.createElement("p");
    winnerText.id = "winnerText";
    if(typeof message === 'number'){
    winnerText.innerText = `Player ${message} won`;   
    }
    else{
      winnerText.innerText = `No Player Won its a Draw`; 
    }
    winnerText.style.color = "black";
    var winnerpop = document.createElement('button');
    winnerpop.id = "winnerpop";
    winnerpop.innerText = `Click to Restart Game`;
    winnerpop.style.width = "150px";
    winnerpop.style.height = "50px";
    winnerpop.onclick = function () {      
      gameActive = false;
      window.location.reload();
    };
    x.appendChild(winnerText);                          
    x.appendChild(winnerpop);
    document.body.appendChild(x); 
  }

  function showrule() {
    var x = document.getElementById("GameRules");    
    if (x.style.visibility == "visible") {
      x.style.visibility = "hidden";
    } else {
      x.style.visibility = "visible";
    }
  }
  const rows = 6;
  const cols = 7;
  const board = Array.from({ length: rows }, () => Array(cols).fill(0));
  let currentPlayer = 1;
  let gameActive = true;
  function BoardCreation() {
    const Belmt = document.getElementById('createboard');
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const disc = document.createElement('div');
        disc.className = 'disc';
        disc.dataset.row = i;
        disc.dataset.col = j;
        disc.addEventListener('click', Usermovement);  
        Belmt.appendChild(disc);
      }
    }
    Belmt.classList.add('fade-in');
  }
  function Usermovement(event) {
    if (!gameActive) return;
    const col = parseInt(event.target.dataset.col);
    const row = nextavailablerow(col);
    if (row !== -1) {
      board[row][col] = currentPlayer;
      FillDisc(row, col);
      if (WinnerPlayer(row, col)) {
        setTimeout(() => {
          endGame(currentPlayer);
        }, 100);
      } else if (Drawgame()) {
        endGame('draw');
      } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        ChangePlayerchoice();
      }
    } else {
      alert('Switch to another column.');
    }
  }
  function nextavailablerow(col) {
    for (let i = rows - 1; i >= 0; i--) {
      if (board[i][col] === 0) {
        return i;
      }
    }
    return -1;
  }
  function FillDisc(row, col) {
    const disc = document.querySelector(`.disc[data-row="${row}"][data-col="${col}"]`);
    disc.classList.add('fade-in1');
    disc.style.backgroundColor = currentPlayer === 1 ? 'black' : 'white';
    disc.addEventListener('complete', () => {
    disc.classList.remove('fade-in1');
  });
  }

  function WinnerPlayer(row, col) {
    return (
      checkDirection(row, col, 0, 1) ||
      checkDirection(row, col, 1, 0) ||
      checkDirection(row, col, 1, 1) ||
      checkDirection(row, col, -1, 1)
    );
  }
  function checkDirection(row, col, rowDir, colDir) {
    const player = board[row][col];
    let count = 1;
    for (let i = 1; i < 4; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;
      if (
        newRow < 0 || newRow >= rows ||
        newCol < 0 || newCol >= cols ||
        board[newRow][newCol] !== player
      ) {
        break; 
      }
      count++;
    }
    for (let i = 1; i < 4; i++) {
      const newRow = row - i * rowDir;
      const newCol = col - i * colDir;
      if (
        newRow < 0 || newRow >= rows ||
        newCol < 0 || newCol >= cols ||
        board[newRow][newCol] !== player
      ) {
        break; 
      }
      count++;
    }
    return count >= 4; 
  }
  function Drawgame() {
    return board.every(row => row.every(disc => disc !== 0));
  }

  function ChangePlayerchoice() {
    var p = document.getElementById('playerchoice');  
    if(currentPlayer == 1){
      p.style.color = "yellow";
    }
    else {
      p.style.color = "white";
    }
    document.getElementById('playerchoice').innerText = `Player ${currentPlayer}'s Turn`;  
  }
  BoardCreation();
  ChangePlayerchoice();

