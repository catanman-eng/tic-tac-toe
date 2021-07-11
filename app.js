"use strict";

// PLAYERS

const Player = (val) => {
  
  const getPlayerVal = () => {
    return val;
  };

  return {val, getPlayerVal}
};

// GAMEBOARD
const gameBoard = (() => {

  const board = new Array(9);

  const setVal = (index, val) => {
    if(index > board.length) return;
    board[index] = val;
  }

  const getBoardVal = (index) => {
    if(index > board.length) return;
    return board[index];
  }

  const reset= () => {
    for (let i = 0; i < board.length; i ++){
      board[i] = "";
    }

  };
  
return{setVal, getBoardVal, reset};
 
})();


// DISPLAY

const displayController = (() => {

  const squareElements = document.querySelectorAll(".square")
  const reset = document.querySelector(".reset");


  squareElements.forEach((square) => { 
    square.addEventListener("click", (e) => {
      if (e.target.textContent !== "") return;
      gameController.playRound(parseInt(e.target.id));
      updateBoard();
    });

  });

  const updateBoard = () => {
    for (let i = 0; i < squareElements.length; i++){
      squareElements[i].textContent = gameBoard.getBoardVal(i);
    };
};

  const resetBoard = () => {
    for (let i = 0; i < gameBoard.board.length; i ++){
      gameBoard.board[i] = "";
    }
    updateBoard();

  };

  reset.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    updateBoard();
  });


return {resetBoard, updateBoard}

})();

// GAME

const gameController = (() => {

  const player1 = Player("X");
  const player2 = Player("O");

  const popup = document.querySelector(".popup");
  const message = document.querySelector(".message");


  let currentRound = 1;

  const playRound = (index) => {
    gameBoard.setVal(index, getCurrentVal());
    if (getWinner(index)) {
      popup.textContent=`Player ${getCurrentVal()} wins!`
      popUp.openPopup()
      return;
    };

    if (currentRound === 9) {
      popup.textContent=`It's a Draw!`
      popUp.openPopup()
      return;
    }
    currentRound ++;
    message.textContent = `Player ${getCurrentVal()}'s turn`
  };

  const getCurrentVal = () => {
    return currentRound % 2  === 1 ? player1.getPlayerVal() : player2.getPlayerVal();
  
  };

  const getWinner = (fieldIndex) => {
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

     return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getBoardVal(index) === getCurrentVal()
        )
      );
  };

  const reset = () => {
    currentRound = 1;
  }

  return{playRound, reset}

})();

// Popup

const popUp = (() => {
  const popup = document.querySelector(".popup");
  const overlay = document.querySelector(".popup-overlay");

  const openPopup = () => {
    popup.classList.toggle("popup-open");
    overlay.classList.toggle("overlay-open");
  }

  const closePopup = () => {
    popup.classList.toggle("popup-open");
    overlay.classList.toggle("overlay-open");
  }

  overlay.addEventListener("click", closePopup);
  overlay.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    displayController.updateBoard();
  });



  return{openPopup, closePopup}

})();


