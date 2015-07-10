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

window.findNRooksSolution = function(n, firstToggle) {
  var solution = new Board({'n':n});
  solution.togglePiece(0,0);

  if (n === 1){
    return solution.rows();
  }
  for (var i = 1; i < n; i++) {
    for (var j = 1; j < n; j++) {
      solution.togglePiece(i,j);
      if(solution.hasAnyRooksConflicts()){
        solution.togglePiece(i,j);
      } else{
        break;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();

};

//if you put your first rook somewhere that CAN'T have a solution, just return

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
// iterate through the columns
  //toggle on on the first element
  // if no conflicts
    // recursively move to second row

  // toggle back and try with the next column
  var solutionCount = 0;
  var solution = new Board({n:n});

  var findSolution = function(row){

    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      solution.togglePiece(row,i);
      if (!solution.hasAnyRooksConflicts()) {
        findSolution(row+1);
      }
      solution.togglePiece(row,i);
    }
  };

  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n':n});
  var holder;


  if( n === 2 || n === 3) {
    return solution.rows();
  }

  var findSolution = function(row){

    if (row === n) {
      holder = JSON.parse(JSON.stringify(solution.rows()));
      return;
    }

    if (!holder) {
      for (var i = 0; i < n; i++) {
        solution.togglePiece(row,i);
        if (!solution.hasAnyQueensConflicts()) {
          findSolution(row+1);
        }
        solution.togglePiece(row,i);
      }
    }
  };

  findSolution(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(holder));
  return holder;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0
  var solution = new Board({n:n});

  var findSolution = function(row){

    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      solution.togglePiece(row,i);
      if (!solution.hasAnyQueensConflicts()) {
        findSolution(row+1);
      }
      solution.togglePiece(row,i);
    }
  };

  findSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
