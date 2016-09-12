function Board(rows) {
  this.rows = rows;
}
Board.prototype.removeFromRow = function(move) {
  this.rows[move[0]] -= move[1];
};
Board.prototype.addToRow = function(move) {
  this.rows[move[0]] += move[1];
};

function elt(type, className) {
  var element = document.createElement(type);
  if (className)
    element.className = className;
  return element;
}

function DOMDisplay(parent, board) {
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
    this.board.appendChild(tokens);
  });

  this.controls = parent.appendChild(elt('div'));
  var move = this.controls.appendChild(elt('button'));
  move.innerHTML = 'move';
  move.addEventListener('click', function() {
    var board = document.getElementById('board');
    for (var i = board.children.length - 1; i >= 0; i--) {
      for (var j = board.children[i].children.length - 1; j >= 0; j--) {
        var token = board.children[i].children[j];
        var chosen = token.getAttribute('data-chosen') === 'true';
        if (chosen)
          token.parentNode.removeChild(token);
      }
    }
  });
}
DOMDisplay.prototype.clear = function() {
  this.board.parent.removeChild(this.board);
}
