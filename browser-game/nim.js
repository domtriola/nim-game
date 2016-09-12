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
  this.display = parent.appendChild(elt('div', 'board'));
  board.forEach(function(row) {
    var tokens = elt('div', 'row');
    for (var i = 0; i < row; i++) {
      var token = elt('div', 'token');
      tokens.appendChild(token);
    }
    this.display.appendChild(tokens);
  });
}
DOMDisplay.prototype.clear = function() {
  this.display.parent.removeChild(this.display);
}
