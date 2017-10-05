//global variables
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var canvasWidth = 300;
var canvasHeight = 660;
var scoreBoard = document.getElementById('scoreBoard');
var squareWidth = canvasWidth / 10;
var squareHeight = canvasHeight / 22;
var currentPiece;
var currentBoard;
var gameTimer;
var score = 0;
//end of global variables

document.addEventListener('keyup', keyUpHandler, false);
/* 
  * checks which key is pressed
  * 38 - rotate the piece, 39 - move right, 37 - move left 
*/
function keyUpHandler(e) {
  if (e.keyCode === 38) {
    potentialVersion = currentPiece.version < 3 ? currentPiece.version + 1 : 0;
    //if there is enough space to rotate, rotate the piece
    if (!detectRotationWallCollision(potentialVersion)) {
      currentPiece.version = potentialVersion;
    }
  } else if (e.keyCode == 39) {
    //returns false if the move does not go off the board
    if (!detectMoveWallCollision('right')) {
      currentPiece.xLocation += squareWidth;
    }
  } else if (e.keyCode == 37) {
    if (!detectMoveWallCollision('left')) {
      currentPiece.xLocation -= squareWidth;
    }
  }
}

/* 
  * Confirming the players movement is not exceeding the board's sides
  * @returns {boolean} false - space available for the move; true - not enough space
*/
function detectMoveWallCollision(direction) {
  var currentSquareY = currentPiece.yLocation;
  for (var row = 0; row < 3; row++) {
    var currentSquareX = currentPiece.xLocation;
    for (var col = 0; col < 3; col++) {
      if (currentPiece.type[currentPiece.version][row][col] === 1) {
        if (
          currentSquareX + squareWidth >= canvasWidth &&
          direction === 'right'
        ) {
          return true;
        } else if (currentSquareX <= 0 && direction === 'left') {
          return true;
        }
      }
      currentSquareX += squareWidth;
    }
    currentSquareY += squareHeight;
  }
  return false;
}

/* 
  * Confirming the piece has the necessary space to rotate
  * @returns {boolean} false - space available to rotate; true - not enough space
*/
function detectRotationWallCollision(rotation) {
  var currentSquareY = currentPiece.yLocation;
  for (var row = 0; row < 3; row++) {
    var currentSquareX = currentPiece.xLocation;
    for (var col = 0; col < 3; col++) {
      if (currentPiece.type[rotation][row][col] === 1) {
        if (currentSquareX + squareWidth > canvasWidth) {
          return true;
        } else if (currentSquareX < 0) {
          return true;
        }
      }
      currentSquareX += squareWidth;
    }
    currentSquareY += squareHeight;
  }
  return false;
}

/* 
  * loops through each square in the piece, checking if it hits the bottom
  * as well as calling didSquareLand() on each square to see if hit another piece
  * 
*/
function checkIfPieceLanded() {
  var currentSquareYLocation = currentPiece.yLocation;
  for (var row = 0; row < 3; row++) {
    var currentSquareXLocation = currentPiece.xLocation;
    for (var col = 0; col < 3; col++) {
      if (currentPiece.type[currentPiece.version][row][col] === 1) {
        var squareYLocationInGameBoard = currentSquareYLocation / squareHeight;
        var squareXLocationInGameBoard = currentSquareXLocation / squareHeight;

        //checking if the square touched bottom of the board or another peice
        if (
          //minus one to switch from 1 to 0 index
          squareYLocationInGameBoard === 21 ||
          didSquareLand(squareYLocationInGameBoard, squareXLocationInGameBoard)
        ) {
          handleLandedPiece();
          return;
        }
      }
      currentSquareXLocation += squareWidth;
    }
    currentSquareYLocation += squareHeight;
  }
}

/* 
  * loops through the game board checking if the square landed on another piece
  * @returns {boolean} true - if the piece landed, false - if piece did not land
*/
function didSquareLand(squareYLocation, squareXLocation) {
  for (var row = 0; row < 22; row++) {
    for (var col = 0; col < 10; col++) {
      //if the space is occupied
      if (currentBoard.gameBoardArray[row][col]) {
        //if the row below is occupied and directly above the square
        if (squareYLocation + 1 === row && squareXLocation === col) {
          return true;
        }
      }
    }
  }
  return false;
}

/* 
  * When a piece lands:
  *   update the game board (and check if the game is over)
  *   reset the current piece, so a new one will fall
  *   check if a row needs to be deleted
*/
function handleLandedPiece() {
  updateGameBoard();
  currentPiece = null;
  checkAndDeleteRow();
}

/* 
  * updates the game board when a piece lands, putting 1s where a space is occupied
  * and calls gameOver a piece enters the top row
*/
function updateGameBoard() {
  var currentSquareYLocation = currentPiece.yLocation;
  for (var row = 0; row < 3; row++) {
    var currentSquareXLocation = currentPiece.xLocation;
    for (var col = 0; col < 3; col++) {
      if (currentPiece.type[currentPiece.version][row][col] === 1) {
        var squareYLocationInGameBoard = currentSquareYLocation / squareHeight;
        var squareXLocationInGameBoard = currentSquareXLocation / squareHeight;
        if (squareYLocationInGameBoard === 0) {
          gameOver();
          return;
        }
        currentBoard.gameBoardArray[squareYLocationInGameBoard][
          squareXLocationInGameBoard
        ] = 1;
      }
      currentSquareXLocation += squareWidth;
    }
    currentSquareYLocation += squareHeight;
  }
}

/* 
  * checks if a row needs to be deleted 
  * if row is full, removes the row
*/
function checkAndDeleteRow() {
  for (var row = 0; row < 22; row++) {
    for (var col = 0; col < 10; col++) {
      if (!currentBoard.gameBoardArray[row][col]) {
        break;
      } else if (col === 9) {
        score += 100;
        for (var rowIndex = row; rowIndex >= 0; rowIndex--) {
          currentBoard.gameBoardArray[rowIndex] =
            currentBoard.gameBoardArray[rowIndex - 1];
        }
        currentBoard.gameBoardArray[0] = Array.apply(null, Array(10)).map(
          Number.prototype.valueOf,
          0
        );
      }
    }
  }
  return false;
}

function gameOver() {
  clearInterval(gameTimer);
  gameTimer = null;
  currentBoard = null;
  score = 0;
  window.alert('Game Over');
  window.location.reload(true);
}

function startGame() {
  gameTimer = setInterval(drawGame, 300);
}
/* 
  * animates the game using setInterval
*/
function drawGame() {
  //sets the score in the view
  scoreBoard.innerText = 'Score: ' + parseInt(score);

  //currentBoard does is null when it is the beginning of a game
  if (!currentBoard) {
    currentBoard = new Board();
  }

  //creates a new piece when there is not a piece falling
  if (!currentPiece) {
    currentPiece = new Piece();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCurrentPiece();
  checkIfPieceLanded();
  drawLandedPieces();
  //gameTimer = setInterval(drawGame, 300);
}

startGame();
