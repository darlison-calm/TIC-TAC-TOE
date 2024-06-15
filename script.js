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
    board.forEach((_,index) => {
      board[index] = '';
    })
  };

  const printBoard = () => {
    console.log("\n");
    console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
    console.log("---------");
    console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
    console.log("---------");
    console.log(`${board[6]} | ${board[7]} | ${board[8]}`);
  }

  return {getCell, setCell, reset, printBoard};

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

  const getActivePlayerSign = () => {
    return ( round & 1 ) ? playerOne.getSign() : playerTwo.getSign();
  }

  const playRound = (index) => {
    gameBoard.setCell(index, getActivePlayerSign());
    
    if(checkWinner) {
      isOver = true;
      return
    }
    if(round === 9){
      isOver = true; 
      return
    }

    round++;
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
      return condition.every((index) => board.getCell(index) === getActivePlayerSign())
    });
  }


  const printNewBoard = () =>{
    gameBoard.printBoard();
    console.log(`${getActivePlayerSign()}'s turn.`);
  }

  const resetGame = () => {
    round = 1
    isOver = true
  }

  const isGameOver = () => {
    return isOver;
  }

  return {
    playRound, isGameOver, resetGame
  }

})();