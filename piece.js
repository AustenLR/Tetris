/* 
  * Pieces are made in a 3 by 3 grids(rows and columns)
  * 1 indicates a square; 0 means no square
  * Each piece has 4 different versions, based on the current rotation
*/
function Piece() {
  var j = [
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]]
  ];

  var o = [
    [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
    [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
    [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
    [[1, 1, 0], [1, 1, 0], [0, 0, 0]]
  ];

  var s = [
    [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 0, 1]]
  ];

  var t = [
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]]
  ];

  this.piecesTypesArray = [j, o, s, t];
  //this.piecesColorArray = ['blue', 'green', 'purple'];

  //randomly chooses a type from the piecesTypesArray
  var randomTypeIndex = Math.floor(Math.random() * 4);

  this.type = this.piecesTypesArray[randomTypeIndex];
  this.color = this.piecesColorArray[randomTypeIndex];

  //verision is the current rotation of the piece
  this.version = 0;

  //x position of the left column of the piece grid
  this.xLocation = canvasWidth / 5;
  this.yLocation = -canvasHeight / 22;
  this.fallingSpeed = canvasHeight / 22;
}

Piece.prototype.piecesColorArray = ['blue', 'yellow', 'green', 'purple'];
