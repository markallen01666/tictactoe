// Tic Tac Toe webapp functionality
// M Allen: Freelance Web Developer - 2017

// Global scope variables
var playerFirst;
var gameActive;
var moveCount;
var playerSymbol;
var computerSymbol;
var lastPlayerMove;
var board;
var playAgainChoice;


// Board array
// Single dimensional representing playing Board with element numbers of:
// -------------
// | 0 | 1 | 2 |
// | 3 | 4 | 5 |
// | 6 | 7 | 8 |
// -------------
function resetBoard() {
  // Set empty board array
  board = [
                "0", "0", "0",
                "0", "0", "0",
                "0", "0", "0"
              ];
  // Clear displayed Board
  for (i=0; i < 9; i++) {
    $("#cell" + i).html("<h1>&nbsp;</h1>");
    $("#cell" + i).removeClass("winner");
  }
  // Default values
  playerFirst = true;
  gameActive = false;
  playAgainChoice = false;
  moveCount = 0;
  playerSymbol = "";
  computerSymbol = "";
  lastPlayerMove = "";
  // Start choice
  $("#playerStart").html('<img class="img-offset" src="images/player.svg" alt="Player"/><h4>Player</h4>');
  $("#computerStart").html('<img class="img-offset" src="images/computer.svg" alt="Computer"/><h4>Computer</h4>');
  $("#instruction").html('<br /><h4><strong>Choose who starts</strong></h4>');
  // Remove result formatting
  $("#playerStart").removeClass("loserText");
  $("#computerStart").removeClass("loserText");
  $("#playerStart").removeClass("winnerText");
  $("#computerStart").removeClass("winnerText");
  $("#playAgain").html("");
}

// Choose player to start first
function chooseStarter() {
  $("#playerStart").on("click", function() {
    if (!gameActive) {
      gameActive = true;
      playerSymbol = "X";
      computerSymbol = "O";
      $("#playerStart").html("<h1 class='gameSymbol'>X</h1><h4>Player</h4>");
      $("#instruction").html("<h4></h4>");
      $("#computerStart").html("<h1 class='gameSymbol'>O</h1><h4>Computer</h4>");
    }
  });
  $("#computerStart").on("click", function() {
    if (!gameActive) {
      playerFirst = false;
      gameActive = true;
      playerSymbol = "O";
      computerSymbol = "X";
      $("#playerStart").html("<h1 class='gameSymbol'>O</h1><h4>Player</h4>");
      $("#instruction").html("<h4></h4>");
      $("#computerStart").html("<h1 class='gameSymbol'>X</h1><h4>Computer</h4>");
      gameMove();
    }
  });
}

// Check for player win
function winCheck(player) {
  var gameWon = false;
  // Row player win
  for (i=0; i < 9; i=i+3) {
    if (board[i] == player && board[i+1] == player && board[i+2] == player) {
      $("#cell" + i).addClass("winner");
      $("#cell" + (i+1)).addClass("winner");
      $("#cell" + (i+2)).addClass("winner");
      gameWon = true;
    }
  }
  // Column player win
  for (i=0; i < 3; i++) {
    if (board[i] == player && board[i+3] == player && board[i+6] == player) {
      $("#cell" + i).addClass("winner");
      $("#cell" + (i+3)).addClass("winner");
      $("#cell" + (i+6)).addClass("winner");
      gameWon = true;
    }
  }
  // Diagonal player win
  if (board[0] == player && board[4] == player && board[8] == player) {
    $("#cell0").addClass("winner");
    $("#cell4").addClass("winner");
    $("#cell8").addClass("winner");
    gameWon = true;
  }
  if (board[2] == player && board[4] == player && board[6] == player) {
    $("#cell2").addClass("winner");
    $("#cell4").addClass("winner");
    $("#cell6").addClass("winner");
    gameWon = true;
  }
  return gameWon;
}

// Check if player or computer has won once they have moved
function checkForWin() {
  if (winCheck("C")) {
    // Computer wins
    $("#computerStart").addClass("winnerText");
    $("#playerStart").addClass("loserText");
    $("#instruction").html("<br /><strong><h4>Computer wins!</h4></strong>");
    newGame();
  } else if (winCheck("P")) {
    // Player wins
    $("#playerStart").addClass("winnerText");
    $("#computerStart").addClass("loserText");
    $("#instruction").html("<br /><strong><h4>Player wins!</h4></strong>");
    newGame();
  } else if (moveCount > 8) {
    // Draw
    $("#playerStart").addClass("loserText");
    $("#computerStart").addClass("loserText");
    $("#instruction").html("<br /><strong><h4>It's a draw!</h4></strong>");
    newGame();
  }
}

// Does the player want another game?
function newGame() {
  gameActive = false;
  playAgainChoice = true;
  $("#playAgain").html("<strong><h3>Play Again</h3></strong>");
  // Play again click option
  $("#playAgain").on("click", function() {
    if (playAgainChoice == true) {
      playAgainChoice = false;
      resetBoard();
    }
  });
}

// Is a winning move available for the player? Return move cell ID
function canWinCheck(player) {
  var playerWinMove = 999;
  // Check rows
  for (i=0; i<7; i += 3) {
      if (board[i] == player) {
          if (board[i+1] == player && board[i+2] == 0) {playerWinMove = i + 2;}
          if (board[i+1] == 0 && board[i+2] == player) {playerWinMove = i + 1;}
      } else if (board[i] == 0 && board[i+1] == player && board[i+2] == player) {playerWinMove = i;}
  }
  // Check columns
  for (i=0; i<3; i++) {
      if (board[i] == player) {
          if (board[i+3] == player && board[i+6] == 0) {playerWinMove = i + 6;}
          if (board[i+3] == 0 && board[i+6] == player) {playerWinMove = i + 3;}
      } else if (board[i] == 0 && board[i+3] == player && board[i+6] == player){playerWinMove = i;}
  }
  // Check diagonals
  if (board[4] == player) {
  	if (board[0] == player && board [8] == 0) {playerWinMove = 8;}
  	if (board[0] == 0 && board[8] == player)  {playerWinMove = 0;}
  	if (board[2] == player && board[6] == 0)  {playerWinMove = 6;}
  	if (board[2] == 0 && board[6] == player)  {playerWinMove = 2;}
  } else if (board[4] == 0) {
  	if ((board[0] == player && board[8] == player) || (board[2] == player && board[6] == player ))  {playerWinMove = 4;}
  }
  return playerWinMove;
};

// Game logic
function gameMove() {
  if (gameActive) {checkForWin();}
  var computerCanWinCell = canWinCheck("C");
  var playerCanWinCell = canWinCheck("P");
  // If computer can win - play winning move
  if (computerCanWinCell < 9 && gameActive) {
    board[computerCanWinCell] = "C";
    $("#cell" + computerCanWinCell).html("<h1>" + computerSymbol + "</h1>");
    moveCount++;
  // If player can win - block winning move
  } else if (playerCanWinCell < 9 && gameActive) {
      board[playerCanWinCell] = "C";
      $("#cell" + playerCanWinCell).html("<h1>" + computerSymbol + "</h1>");
      moveCount++;
  // If board not full
  } else if (moveCount < 9 && gameActive) {
    // Computer moves first
    // Computer moves first - first computer move
    if (moveCount == 0 && !playerFirst) {
      board[0] = "C";
      $("#cell0").html("<h1>" + computerSymbol + "</h1>");
      moveCount++;
    // Computer moves first - second computer move (move 3)
    } else if (moveCount == 2 && !playerFirst) {
      if (lastPlayerMove == 4) {
        board[8] = "C";
        $("#cell8").html("<h1>" + computerSymbol + "</h1>");
        moveCount++;
      } else if (board[2] == "0" && lastPlayerMove != 1 && lastPlayerMove != 5) {
        board[2] = "C";
        $("#cell2").html("<h1>" + computerSymbol + "</h1>");
        moveCount++;
      } else if (board[6] == "0" && lastPlayerMove != 3 && lastPlayerMove != 7) {
        board[6] = "C";
        $("#cell6").html("<h1>" + computerSymbol + "</h1>");
        moveCount++;
      } else if (board[8] == "0" && lastPlayerMove != 5 && lastPlayerMove != 7) {
        board[8] = "C";
        $("#cell8").html("<h1>" + computerSymbol + "</h1>");
        moveCount++;
      }
    // Computer moves first - third computer move (move 5)
    } else if (moveCount == 4 && !playerFirst) {
      if (board[2] == "P" && board[6] == "0") {
        board[6] = "C";
        $("#cell6").html("<h1>" + computerSymbol + "</h1>");
        moveCount++;
      } else if (board[6] == "P") {
        board[2] = "C";
        $("#cell2").html("<h1>" + computerSymbol + "</h1>");
        moveCount++;
      } else {
        board[8] = "C";
        $("#cell8").html("<h1>" + computerSymbol + "</h1>");
        moveCount++;
      }
    // Player moves first
    } else if (playerFirst) {
      // Player moves first - first computer move
      if (moveCount == 1 && board[4] == "0") {
        board[4] = "C";
        $("#cell4").html("<h1>" + computerSymbol + "</h1>");
        moveCount++;
      // Player moves first - second computer move
      } else if (moveCount == 3 && ((board[0] == "P" || board[2] == "P" || board[6] == "P" || board[8] == "P") && board[4] == "C")) {
        for (i=1; i < 8; i=i+2) {
          if (board[i] == "0") {
            board[i] = "C";
            $("#cell" + i).html("<h1>" + computerSymbol + "</h1>");
            moveCount++;
            // End loop early
            i = 8;
          }
        }
      // Player moves first - third computer move
      } else if (moveCount == 5 && (((board[1] == "P" && board[7] == "P") || (board[3] == "P" && board[5] == "P")) && board[8] == "P")) {
        board[2] = "C";
        $("#cell2").html("<h1>" + computerSymbol + "</h1>");
        moveCount++;
      // Otherwise, computer moves to first empty cell
    } else if (gameActive) {
        for (i=0; i < 9; i++) {
          if (board[i] == "0") {
            board[i] = "C";
            $("#cell" + i).html("<h1>" + computerSymbol + "</h1>");
            moveCount++;
            // End loop early
            i = 9;
          }
        }
      }
    }
  }
  if (gameActive) {checkForWin();}
};

// Enable functionality when document has loaded
$(document).ready(function() {
  resetBoard();
  chooseStarter();
  // User selects cell for move
  $("#cell0").on("click", function() {
    if (gameActive && board[0] == "0") {
      board[0] = "P";
      lastPlayerMove = 0;
      $("#cell0").html("<h1>" + playerSymbol + "</h1>");
      moveCount++;
      gameMove();
    }
  });
  $("#cell1").on("click", function() {
    if (gameActive && board[1] == "0") {
      board[1] = "P";
      lastPlayerMove = 1;
      $("#cell1").html("<h1>" + playerSymbol + "</h1>");
      moveCount++;
      gameMove();
    }
  });
  $("#cell2").on("click", function() {
    if (gameActive && board[2] == "0") {
      board[2] = "P";
      lastPlayerMove = 2;
      $("#cell2").html("<h1>" + playerSymbol + "</h1>");
      moveCount++;
      gameMove();
    }
  });
  $("#cell3").on("click", function() {
    if (gameActive && board[3] == "0") {
      board[3] = "P";
      lastPlayerMove = 3;
      $("#cell3").html("<h1>" + playerSymbol + "</h1>");
      moveCount++;
      gameMove();
    }
  });
  $("#cell4").on("click", function() {
    if (gameActive && board[4] == "0") {
      board[4] = "P";
      lastPlayerMove = 4;
      $("#cell4").html("<h1>" + playerSymbol + "</h1>");
      moveCount++;
      gameMove();
    }
  });
  $("#cell5").on("click", function() {
    if (gameActive && board[5] == "0") {
      board[5] = "P";
      lastPlayerMove = 5;
      $("#cell5").html("<h1>" + playerSymbol + "</h1>");
      moveCount++;
      gameMove();
    }
  });
  $("#cell6").on("click", function() {
    if (gameActive && board[6] == "0") {
      board[6] = "P";
      lastPlayerMove = 6;
      $("#cell6").html("<h1>" + playerSymbol + "</h1>");
      moveCount++;
      gameMove();
    }
  });
  $("#cell7").on("click", function() {
    if (gameActive && board[7] == "0") {
      board[7] = "P";
      lastPlayerMove = 7;
      $("#cell7").html("<h1>" + playerSymbol + "</h1>");
      moveCount++;
      gameMove();
    }
  });
  $("#cell8").on("click", function() {
    if (gameActive && board[8] == "0") {
      board[8] = "P";
      lastPlayerMove = 8;
      $("#cell8").html("<h1>" + playerSymbol + "</h1>");
      moveCount++;
      gameMove();
    }
  });
});
