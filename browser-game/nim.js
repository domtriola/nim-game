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
  moveButton.innerHTML = 'move';
  moveButton.addEventListener('click', function() {
    var board = document.getElementById('board');
    for (var i = board.children.length - 1; i >= 0; i--) {
      for (var j = board.children[i].children.length - 1; j >= 0; j--) {
        var token = board.children[i].children[j];
        var chosen = token.getAttribute('data-chosen') === 'true';
        if (chosen)
          token.parentNode.removeChild(token);
      }
    }
    self.switchPlayers();
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
    winText.innerHTML = currentPlayer.name + " Wins!";
  }
  this.currentPlayer.takeTurn(this);
};
Game.prototype.over = function() {

};

function HumanPlayer(name) {
  this.name = name;
}
HumanPlayer.prototype.takeTurn = function(game) {
  game.playerTurn.innerHTML = this.name + "'s Turn";
  game.controls.style = 'display: block';
};

function ComputerPlayer(name) {
  this.name = name;
}
ComputerPlayer.prototype.takeTurn = function(game) {
  game.playerTurn.innerHTML = this.name + "'s Turn";
  game.controls.style = 'display: none';
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
