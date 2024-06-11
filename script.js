const gameBoard = (function () {
  const board = ['', '', '', '', '','', '', '', ''];
  
  const getBoard = () => board;

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  
  const setField = (index, symbol) => {
    if(index >board.length) return
    board[index] = symbol
  };

  const clear = () =>{
    board.forEach((_,index) => {
      board[index] = '';
    })
  };

  return { getBoard, setField,clear, getField}
})();

const gameController = (function() {
  
})()