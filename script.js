//TO DO:  
//ADD RESET BUTTOM  
//ADD INTERFACE TO ALLOW PLAYERS TO PUT IN THEIR NAMES

const gameBoard = (function() {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getCell = (index) => {
    if(index > board.length) return;
    return board[index]
  };

  const setCell = (index, sign) => {
    if(index > board.length) return;
    if(board[index] !== '') return;
    board[index] = sign;
  };

  const reset = () => {
    for(let index = 0; index < board.length; index++){
      board[index] = '';
    }
  };

  return {
    getCell, setCell, reset
  };

})();

function Player(sign) {
  return {
    getSign: function() {
      return sign;
    }
  };
};

const gameController = (function(){
  const playerOne = Player('X');
  const playerTwo = Player('O');
  let round = 1;
  let isOver = false;

  const getRound = () => {
    return round;
  }

  const playRound = (index) => {
    gameBoard.setCell(index, getActivePlayerSign());
    
    if(checkWinner()){
      isOver = true;
      screenController.setResultMessage(getActivePlayerSign());
      return
    }

    if(round === 9){
      isOver = true; 
      screenController.setResultMessage('Draw');
      return
    }

    round++;
    screenController.setScreenMessage(`${getActivePlayerSign()}'s turn`)
  }

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((condition) => { 
      return condition.every((index) => gameBoard.getCell(index) === getActivePlayerSign())
    });
  }

  const getActivePlayerSign = () => {
    return ( round & 1 ) ? playerOne.getSign() : playerTwo.getSign();
  }
    
  const resetGame = () => {
    round = 1;
    isOver = false;
  }

  const isGameOver = () => {
    return isOver;
  }

  return {
    playRound, isGameOver, resetGame, getRound
  }

})();

const screenController = (function(){
  const boardCells = document.querySelectorAll('.cell');
  const message = document.querySelector('h1');
  const resetBtn = document.getElementById('btn');

  boardCells.forEach((cell) => {
    cell.addEventListener("click", (e) =>{
      if(gameController.isGameOver() || e.target.textContent !== "") return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateBoard();
      updateSignColor(e);
      updateMessageColor(message);
    })
  })

  boardCells.forEach((cell) => {
    cell.addEventListener("mouseover", (e) =>{
      if(e.target.textContent !== '' || gameController.isGameOver()){
        e.target.classList.remove('hover-effect-red');
        e.target.classList.remove('hover-effect-blue');
        return
      }
      toogleHoverEffect(e, gameController.getRound())
    })
  })

  resetBtn.addEventListener("click", (e) => {
    reset();
  })

  const toogleHoverEffect = (e, round) => {
    if(round % 2 === 0){
      e.target.classList.add('hover-effect-blue');
      e.target.classList.remove('hover-effect-red');
      return
    }
    else {
      e.target.classList.add('hover-effect-red');
      e.target.classList.remove('hover-effect-blue');
      return
    }
  }

  const reset = () => {
    gameBoard.reset()
    gameController.resetGame();
    updateBoard();
    setScreenMessage("X's turn");
    updateMessageColor(message);
  }
  
  const updateSignColor = (e) => {
    if (e.target.textContent === 'X') {
      e.target.style.color = "#ff0000";
    } 
    else {
      e.target.style.color = "#0000FF";
    }
  }

  const updateMessageColor = (e) => {
    if (e.textContent === "It's a Draw!"){
      e.style.color = "#00ff00e0";
    } 
    else if (gameController.getRound() % 2 !== 0){
      e.style.color = "#ff0000"
    }
    else {
      e.style.color = "#0000FF";
    }
  }

  const setScreenMessage = (text) => {
    message.textContent = text;
  }

  const setResultMessage = (winner) => {
    if (winner === "Draw"){
      setScreenMessage("It's a Draw!");
    }
    else {
      setScreenMessage(`Player ${winner} has won!`);
    }
  }

  const updateBoard = () => {
    for(let i = 0; i < boardCells.length; i++){
      boardCells[i].textContent = gameBoard.getCell(i);
    }
  }

  return {
    setResultMessage, setScreenMessage
  }
})();

