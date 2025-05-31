const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X'; // Player "X" starts
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Array to keep track of board state
let gameActive = true; // To check if the game is ongoing

// Function to handle cell clicks
function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  
  if (gameBoard[index] !== "" || !gameActive) return;

  // Mark the cell with the current player's symbol
  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check for a winner
  if (checkWinner()) {
    status.textContent = `${currentPlayer} wins!`;
    status.classList.add('win');
    gameActive = false;
    return;
  }

  // Check for a tie
  if (gameBoard.every(cell => cell !== "")) {
    status.textContent = "It's a tie!";
    gameActive = false;
    return;
  }

  // Switch player (player vs computer)
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `${currentPlayer}'s turn`;

  if (currentPlayer === 'O' && gameActive) {
    setTimeout(aiMove, 500);  // Computer's move with delay for better UX
  }
}

// Function to check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

// Function to make AI's move
function aiMove() {
  if (!gameActive) return;

  let availableMoves = getAvailableMoves();
  let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

  // Make AI move
  gameBoard[move] = "O";
  document.querySelector(`[data-index="${move}"]`).textContent = "O";

  // Check for AI win
  if (checkWinner()) {
    status.textContent = "AI wins!";
    status.classList.add('win');
    gameActive = false;
    return;
  }

  // Check for a tie
  if (gameBoard.every(cell => cell !== "")) {
    status.textContent = "It's a tie!";
    gameActive = false;
    return;
  }

  // Switch back to player
  currentPlayer = "X";
  status.textContent = `${currentPlayer}'s turn`;
}

// Get available moves for AI
function getAvailableMoves() {
  return gameBoard.reduce((acc, val, idx) => {
    if (val === "") acc.push(idx);
    return acc;
  }, []);
}

// Initialize the game
function initializeGame() {
  gameActive = true;
  currentPlayer = "X"; // Player X always starts
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  status.textContent = `${currentPlayer}'s turn`;
  status.classList.remove('win');

  // Reset the board
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.textContent = "");

  // Add event listener to each cell
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

// Initialize the game at the start
initializeGame();



