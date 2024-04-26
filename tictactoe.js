// Initialize an array to represent the game board and a variable to track the number of moves
var board = new Array(9);
var move = 0;

// Get reference to marker buttons container and create buttons for X and O markers
const markerButtons = document.getElementById("buttonMarker");
const markerButtonX = document.createElement("button");
const markerButtonO = document.createElement("button");
markerButtonX.textContent = "X";
markerButtonO.textContent = "O";
markerButtons.appendChild(markerButtonX);
markerButtons.appendChild(markerButtonO);

// Define players
const player1 = { name: "Player 1", marker: "X" };
const player2 = { name: "Player 2", marker: "O" };
let currentPlayer = player1;

// Event listeners for marker buttons
markerButtonX.addEventListener("click", () => {
  currentPlayer = player1;
  player1.marker="X";
  player2.marker="O";
  resetBoard();
  updateBoardUI();
});

markerButtonO.addEventListener("click", () => {
  currentPlayer = player1; 
  player1.marker="O";
  player2.marker="X";
  resetBoard();
  updateBoardUI();
});

// Event listener for clear button
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", () => {
  resetBoard();
  updateBoardUI();
  resultTextContent.innerText = "";
});

// Display area for game result
const resultOfGame = document.getElementById("result");
const resultTextContent = document.createElement("p");
resultTextContent.innerText = "";
resultOfGame.appendChild(resultTextContent);

// Initialize the game
function initializeGame() {
  const boardElement = document.getElementById("board");

  // Create cells for the game board
  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    // Add click event listener to each cell
    cell.addEventListener('click', () => {
      handleCellClick(i);
    });

    boardElement.appendChild(cell);
  }

  resetBoard();
}

// Handle cell click
function handleCellClick(index) {
  let marker = currentPlayer.marker;
  move++;
  resultTextContent.innerText = "";

  if (updateBoard(index, marker)) {
    if (checkWinner()) {
      resultTextContent.innerText = currentPlayer.name + " won";
      updateBoardUI();
      resetBoard();
    } else if (checkTie()) {
      updateBoardUI();
      resetBoard();
      resultTextContent.innerText = "It's a tie!";
    } else {
      updateBoardUI();
      switchPlayer();
      resultTextContent.innerText = currentPlayer.name + "'s turn";
    }
  }
}

// Update the board with marker at specified index
function updateBoard(index, marker) {
  if (board[index] === "") {
    board[index] = marker;
    return true;
  }
  return false; // Cell is already filled
}

// Reset the board
function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  move = 0;
  currentPlayer = player1;
}

// Switch player
function switchPlayer() {
  if(currentPlayer===player1){
    currentPlayer=player2;
  } else{
    currentPlayer=player1;
  }
}

// Update the board UI
function updateBoardUI() {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Check for winner
function checkWinner() {
  const mark = currentPlayer.marker;

  for (let i = 0; i < 3; i++) {
    if ((board[i * 3] === mark && board[i * 3 + 1] === mark && board[i * 3 + 2] === mark) ||
      (board[i] === mark && board[i + 3] === mark && board[i + 6] === mark)) {
      return true;
    }
  }

  if ((board[0] === mark && board[4] === mark && board[8] === mark) ||
    (board[2] === mark && board[4] === mark && board[6] === mark)) {
    return true;
  }

  return false;
}

// Check for tie
function checkTie() {
  return move === 9 && !checkWinner();
}

// Initialize the game when the window is loaded
window.onload = initializeGame;
