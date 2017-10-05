/* 
  * creating a 22x10 Array of Arrays to keep track of where pieces landed
*/
function Board() {
  function generateGameBoard() {
    var gameBoardArray = [];
    for (var row = 0; row < 22; row++) {
      gameBoardArray.push(
        Array.apply(null, Array(10)).map(Number.prototype.valueOf, 0)
      );
    }
    return gameBoardArray;
  }
  this.gameBoardArray = generateGameBoard();
}
