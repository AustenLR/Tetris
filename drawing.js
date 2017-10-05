/* 
  * draws the current falling piece 
  * current piece is made up of a 3x3 array
  * 1 indicates to draw the square, 0 indicates to leave the space empty
*/
function drawCurrentPiece() {
  currentPiece.yLocation += currentPiece.fallingSpeed;
  var currentSquareY = currentPiece.yLocation;
  for (var row = 0; row < 3; row++) {
    currentSquareX = currentPiece.xLocation;
    for (var col = 0; col < 3; col++) {
      if (currentPiece.type[currentPiece.version][row][col] === 1) {
        ctx.beginPath();
        ctx.rect(currentSquareX, currentSquareY, squareWidth, squareHeight);
        ctx.fillStyle = currentPiece.color;
        ctx.fill();
        ctx.closePath();
      }
      currentSquareX += squareWidth;
    }
    currentSquareY += squareHeight;
  }
}

/* 
  * draws the pieces that already fell
  * 1 in the gameBoardArray indicates the space is occupied
*/
function drawLandedPieces() {
  for (var row = 0; row < 22; row++) {
    for (var col = 0; col < 10; col++) {
      if (currentBoard.gameBoardArray[row][col] === 1) {
        ctx.beginPath();
        ctx.rect(
          col * squareWidth,
          row * squareHeight,
          squareWidth,
          squareHeight
        );
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}


