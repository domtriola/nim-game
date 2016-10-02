function elt(type, className) {
  var element = document.createElement(type);
  if (className)
    element.className = className;
  return element;
}

function Game(parent, board, playerOne, playerTwo) {
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.currentPlayer = this.playerOne;
  this.parent = parent;
  var self = this;

  this.playerTurn = parent.appendChild(elt('h2'));
  this.cover = document.getElementById('cover');

  this.board = parent.appendChild(elt('div'));
  this.board.id = 'board';
  board.forEach(function(row) {
    var tokens = elt('div', 'row');
    for (var i = 0; i < row; i++) {
      var token = elt('div', 'token');
      token.setAttribute('data-chosen', false);
      token.addEventListener('click', function() {
        var isTrue = this.getAttribute('data-chosen') === 'true';
        if (isTrue)
          this.setAttribute('data-chosen', 'false');
        else
          this.setAttribute('data-chosen', 'true');
      });
      tokens.appendChild(token);
    }
    self.board.appendChild(tokens);
  });

  this.controls = parent.appendChild(elt('div'));
  this.controls.id = 'controls';

  var moveButton = this.controls.appendChild(elt('button'));
  moveButton.id = 'move';
  moveButton.innerHTML = 'move';
  moveButton.addEventListener('click', function() {
    var board = document.getElementById('board');
    var chosenTokens = {};
    for (var i = board.children.length - 1; i >= 0; i--) {
      for (var j = board.children[i].children.length - 1; j >= 0; j--) {
        var token = board.children[i].children[j];
        var chosen = token.getAttribute('data-chosen') === 'true';
        if (chosen) {
          if (chosenTokens[i] != null)
            chosenTokens[i].push(token);
          else
            chosenTokens[i] = [token];
        }
      }
    }
    if (Object.keys(chosenTokens).length < 1)
      alert('You must chose at least one token');
    else if (Object.keys(chosenTokens).length > 1)
      alert('You cannot chose from more than one row');
    else {
      for (var row in chosenTokens) {
        chosenTokens[row].forEach(function(token) {
          token.parentNode.removeChild(token);
        });
      }
      self.switchPlayers();
    }
  });

  this.parameters = parent.appendChild(elt("div", "parameters"));
  this.parameters.id = "parameters";
  var paramsTitle = this.parameters.appendChild(elt("h4"));
  paramsTitle.innerHTML = "Tokens / Row";
  for (var i = 0; i < 4; i++) {
    var row = document.createElement("input");
    row.setAttribute("type", "number");
    row.setAttribute("value", i + 2);
    row.id = i.toString;
    this.parameters.appendChild(row);
  }

  var refresh = this.parameters.appendChild(elt('button'));
  refresh.innerHTML = "go";
  refresh.addEventListener("click", function(event) {
    var queries = "?";
    var rows = document.querySelectorAll("#parameters input");
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i].value.toString();
      if (i > 0)
        queries += "&" + row;
      else
        queries += row;
    }
    var url = [location.protocol, '//', location.host,
               location.pathname].join('');
    window.location = url + queries;
  });
}
Game.prototype.switchPlayers = function() {
  if (this.currentPlayer == this.playerOne)
    this.currentPlayer = this.playerTwo;
  else
    this.currentPlayer = this.playerOne;
  this.play();
};
Game.prototype.play = function() {
  if (this.over()) {
    var winText = this.parent.appendChild(elt("h4"));
    winText.innerHTML = this.currentPlayer.name + " Wins!";
    return;
  }
  this.currentPlayer.takeTurn(this);
};
Game.prototype.over = function() {
  function hasChild(item) {
    return item.children.length > 0;
  }
  var emptyRows = true;
  var rows = document.getElementById('board').children;
  for (var i = 0; i < rows.length; i++) {
    if (hasChild(rows[i]))
      emptyRows = false;
  }
  return emptyRows;
};

function HumanPlayer(name) {
  this.name = name;
}
HumanPlayer.prototype.takeTurn = function(game) {
  game.playerTurn.innerHTML = this.name + "'s Turn";
  game.cover.style = 'display: none;';
};

function ComputerPlayer(name) {
  this.name = name;
}
ComputerPlayer.prototype.takeTurn = function(game) {
  game.playerTurn.innerHTML = this.name + "'s Turn";
  game.cover.style = 'display: block;'

  var move = this.getMove(game);
  this.makeMove(move);
};
ComputerPlayer.prototype.getMove = function(game) {
  this.board = [];
  for (var i = 0; i < game.board.children.length; i++)
    this.board.push(game.board.children[i].children.length);
  var allMoves = [], zeroSumMoves = [];
  for (var i = 0; i < this.board.length; i++) {
    for (var j = 1; j <= this.board[i]; j++) {
      var move = [i,j];
      allMoves.push(move);
      if (this.makesZeroSum(move))
        zeroSumMoves.push(move);
    }
  }
  for (var i = 0; i < allMoves.length; i++) {
    if (this.isBestMove(allMoves[i]))
      return allMoves[i];
  }
  if (zeroSumMoves.length < 1) {
    return allMoves[Math.floor(Math.random() * allMoves.length)];
  } else {
    return zeroSumMoves[Math.floor(Math.random() * zeroSumMoves.length)];
  }
}
ComputerPlayer.prototype.isBestMove = function(move) {
  var board = this.board.slice(0);
  board[move[0]] -= move[1];
  function greaterThanZero(num) {
    return num > 0;
  }
  function equalsOne(num) {
    return num == 1;
  }
  function sum(a, b) {
    return a + b;
  }
  board = board.filter(greaterThanZero);
  if (board.every(equalsOne)) {
    return board.length % 2 ? true : false;
  } else if (board.reduce(sum) == 1) {
    return true;
  } else {
    return false;
  }
};
ComputerPlayer.prototype.makesZeroSum = function(move) {
  var board = this.board.slice(0);
  board[move[0]] -= move[1];
  if (nimSum(board) == 0)
    return true;
  return false;
};
ComputerPlayer.prototype.makeMove = function(move) {
  var board = document.getElementById('board');
  var moveButton = document.getElementById('move');
  function clickMoveButton() {
    moveButton.click();
  }
  function delayedTokenClicks(i) {
    var interval = i * 500 + 500;
    setTimeout(function() {
      var token = board.children[move[0]].children[i];
      token.click();
    }, interval);
  }
  for (var i = move[1] - 1; i >= 0; i--) {
    delayedTokenClicks(i);
  }
  var finalInterval = move[1] * 500 + 1000;
  setTimeout(clickMoveButton, finalInterval);
};

function nimSum(nums) {
  var binaryNums = [];
  var paddedNums = [];
  var maxLength = 0;
  nums.forEach(function(num) {
    binaryNums.push(num.toString(2));
  });
  binaryNums.forEach(function(num) {
    if (num.length > maxLength)
      maxLength = num.length;
  });
  binaryNums.forEach(function(num) {
    paddedNums.push(pad(num, maxLength));
  });
  var result = null;
  paddedNums.forEach(function(num) {
    if (result == null)
      result = num;
    else {
      for (var i = 0; i < num.length; i++) {
        if (num[i] == "1") {
          if (result[i] == "0")
            result = result.replaceAt(i, "1");
          else
            result = result.replaceAt(i, "0");
        }
      }
    }
  });
  return parseInt(result, 2);
}
function pad(string, length) {
  while (string.length < length)
    string = "0" + string;
  return string;
}
String.prototype.replaceAt = function(index, char) {
  return this.substr(0, index) + char + this.substr(index + 1);
}
