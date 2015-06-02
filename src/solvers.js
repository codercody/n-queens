/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  for(var i = 0; i < n; i++){
    for(var j = 0; j < n; j++){
      if(board.rows()[i][j] === 0){
        board.togglePiece(i, j);
        if(board.hasAnyRooksConflicts()){
          board.togglePiece(i, j);
        }
      }
    }
  }

  return board.rows();
},



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var playingField = new Board({n:n});
  var numSolutions = 0;
  var board = playingField.rows();

  var recursor = function(x){
    if(x >= n){ //base case
      return numSolutions++;
    }
    
    // place a single piece, go to next row
    for(var y = 0; y < board[x].length; y++){

      playingField.togglePiece(x, y); // add piece

      if(!playingField.hasAnyRooksConflicts() ){ // if the placement was good
        recursor(x + 1);
      }

      playingField.togglePiece(x, y); // remove piece
    }
  };
  
  recursor(0);
  
  return numSolutions;
},



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var deepSlice = function(arr){
    var copy = [];
    for(var i = 0; i < arr.length; i++){
      var row = [];
      for(var j = 0; j < arr[i].length; j++){
        row.push(arr[i][j]);
      }
      copy.push(row);
    }
    return copy;
  };

  var playingField = new Board({n:n});
  var solution;
  var board = playingField.rows();

  var recursor = function(x){
    if(x >= n){ //base case
      solution = deepSlice(board);
      console.log('in recursor ' + JSON.stringify(solution));
      return;
    }
    
    // place a single piece, go to next row
    for(var y = 0; y < board[x].length; y++){

      playingField.togglePiece(x, y); // add piece

      if(!playingField.hasAnyQueenConflictsOn(x,y) ){ // if the placement was good
        recursor(x + 1);
      }

      playingField.togglePiece(x, y); // remove piece
    }
  };
  
  recursor(0);
  console.log('final solution ' + JSON.stringify(solution));
  
  return solution || board;
},


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var playingField = new Board({n:n});
  var numSolutions = 0;
  var board = playingField.rows();

  var recursor = function(x){
    if(x >= n){ //base case
      return numSolutions++;
    }
    
    // place a single piece, go to next row
    for(var y = 0; y < board[x].length; y++){

      playingField.togglePiece(x, y); // add piece

      if(!playingField.hasAnyQueenConflictsOn(x,y) ){ // if the placement was good
        recursor(x + 1);
      }

      playingField.togglePiece(x, y); // remove piece
    }
  };
  
  recursor(0);
  
  return numSolutions;
};
