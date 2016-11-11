/* Helper Functions
------------------------------*/

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

function isBestMove(board, move) {
  var board = board.slice(0);
  board[move[0]] -= move[1];
  board = board.filter(greaterThanZero);
  if (board.every(equalsOne))
    return board.length % 2 ? true : false;
  else if (board.reduce(sum) == 1)
    return true;
  else
    return false;
}
function greaterThanZero(num) {
  return num > 0;
}
function equalsOne(num) {
  return num == 1;
}
function sum(a, b) {
  return a + b;
}

function makesZeroSum(board, move) {
  var board = board.slice(0);
  board[move[0]] -= move[1];
  if (nimSum(board) == 0)
    return true;
  return false;
}

function getBestMove(board) {
  var allMoves = [], zeroSumMoves = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 1; j <= board[i]; j++) {
      var move = [i,j];
      allMoves.push(move);
      if (makesZeroSum(board, move))
        zeroSumMoves.push(move);
    }
  }
  for (var i = 0; i < allMoves.length; i++) {
    if (isBestMove(board, allMoves[i]))
      return allMoves[i];
  }
  if (zeroSumMoves.length < 1)
    return allMoves[Math.floor(Math.random() * allMoves.length)];
  else
    return zeroSumMoves[Math.floor(Math.random() * zeroSumMoves.length)];
}


/* Application Components
------------------------------*/

function Cover(props) {
  var humanStyle = {};
  var compStyle = {
    position: 'absolute',
    width: '500px',
    height: '500px',
  };
  var coverStyle = props.currentPlayer.type == "Computer" && !(props.over)
    ? compStyle
    : humanStyle;

  return (
    <div style={coverStyle}></div>
  );
}

function Header(props) {
  return (
    <div className="header">
      <h1>Nim</h1>
      <h2>Human Vs. {props.opponent}</h2>
    </div>
  );
}

function Game(props) {
  var otherPlayerId = props.currentPlayer.id == 1 ? 2 : 1;
  var rowCounter = 1;
  function rowId() {
    return rowCounter++;
  }

  return (
    <div id="game">
      <div className="board-header">
        {props.over ? "Player " + otherPlayerId + " Wins!"
          : "Player " + props.currentPlayer.id + "'s Turn"}
      </div>
      <div className="board">
        {props.board.map(function(row, rowIndex) {
          return (
            <Row row={row} key={rowId()} toggleToken={function(index)
              {props.toggleToken(rowIndex, index)}}/>
          );
        })}
      </div>
      {props.over
        ? <button onClick={function() {props.onRestart();}}>Play Again</button>
        : <button onClick={function() {props.move();}}>Move</button>
      }
    </div>
  );
}
function Row(props) {
  var tokens = [];
  var tokenCounter = 1;
  function tokenId() {
    return tokenCounter++;
  }
  for (var i = 0; i < props.row.length; i++)
    tokens.push(
      <Token
        key={tokenId()}
        selected={props.row[i]}
        index={i}
        toggle={props.toggleToken}
      />
    );
  return (
    <div className="row">
      {tokens}
    </div>
  );
}
function Token(props) {
  return (
    <div className={"token" + (props.selected ? " chosen" : "")}
    onClick={function() {props.toggle(props.index);}}></div>
  );
}

function Options(props) {
  var optRowCounter = 1;
  function optRowId() {
    return optRowCounter++;
  }
  var difficultyCounter = 1;
  function difficultyId() {
    return difficultyCounter++;
  }
  return (
    <div id="options">
      <div className="setup">
        <div className="option-choices">
          <div>Choose Opponent: </div>
          <OpponentButtons
            selectedOpponent={props.selectedOpponent}
            onOpponentChange={props.onOpponentChange}
          />
        </div>
        <div className="option-choices">
          <div>Choose Difficulty: </div>
          {props.difficulties.map(function(difficulty) {
            return (
              <DifficultyButton
                key={difficultyId()}
                difficulty={difficulty.name}
                subtext={difficulty.subtext}
                chosen={difficulty.chosen}
                board={difficulty.board}
                setBoard={props.setBoard}
              />
            );
          })}
        </div>
        <button id="restart" onClick={function() {props.onRestart();}}>Restart</button>
      </div>
    </div>
  );
}
function OpponentButtons(props) {
  var type = props.selectedOpponent.type;
  var changeOpponent = function(opponentType) {
    props.onOpponentChange(opponentType);
  }
  return (
    <div className="opponent-choice">
      <button className={type == "Human" ? "chosen" : " "}
        onClick={function() {changeOpponent("Human")}}>Human</button>
      <button className={type == "Computer" ? "chosen" : " "}
        onClick={function() {changeOpponent("Computer")}}>Computer</button>
    </div>
  );
}
function DifficultyButton(props) {
  var difficultyClasses = 'difficulty-button';
  if (props.chosen)
    difficultyClasses += ' chosen';
  return (
    <button className={difficultyClasses}
      onClick={function() {props.setBoard(props.board, props.difficulty);}}>
      {props.difficulty}<span className="subtext"><br />({props.subtext})</span>
    </button>
  );
}
function OptionRow(props) {
  return (
    <div className="row">
      <div className="row-number"> Row {props.index + 1} </div>
      <button className="decrement"
        onClick={function() {props.onRowChange(props.index, -1);}}> - </button>
      <div className="row-quantity"> {props.num} </div>
      <button className="increment"
        onClick={function() {props.onRowChange(props.index, 1);}}> + </button>
    </div>
  );
}

var Nim = React.createClass({
  propTypes: {
    initialBoard: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(React.PropTypes.number)),
    initialRows: React.PropTypes.arrayOf(React.PropTypes.number),
  },

  getDefaultProps: function() {
    return {
      initialBoard: [[0,0,0],
                     [0,0,0,0],
                     [0,0,0,0,0],
                     []],
      initialRows: [3, 4, 5, 0],
      playerOne: {id: 1, type: "Human"},
      difficulties: [
        {
          name: "Easy",
          subtext: "not really",
          board: [[0,0,0],
                  [0,0,0,0],
                  [0,0,0,0,0],
                  []],
          chosen: true,
        },
        {
          name: "Medium",
          subtext: "relatively",
          board: [[0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  []],
          chosen: false,
        },
        {
          name: "Hard",
          subtext: "good luck",
          board: [[0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0]],
          chosen: false,
        }
      ],
    };
  },

  getInitialState: function() {
    return {
      board: this.props.initialBoard,
      rows: this.props.initialRows,
      currentPlayer: this.props.playerOne,
      playerTwo: {id: 2, type: "Computer"},
      selectedOpponent: {id: 2, type: "Computer"},
      difficulties: this.props.difficulties,
      over: false,
    }
  },

  toggleToken: function(row, index) {
    this.state.board[row][index] = this.state.board[row][index] == 0 ? 1 : 0;
    this.setState(this.state);
  },

  onMove: function() {
    function empty(array) {
      return !array.length;
    }
    function notEmpty(array) {
      return !!array.length;
    }
    function isOne(num) {
      return num == 1;
    }
    var chosenTokens = this.state.board.map(function(row) {
      return row.filter(isOne);
    }).filter(notEmpty);

    if (empty(chosenTokens))
      alert("You must choose at least one token");
    else if (chosenTokens.length > 1)
      alert("You cannot choose from more than one row");
    else {
      this.state.board = this.state.board.map(function(row) {
        return row.filter(function(token) {return token == 0});
      });

      if (this.state.board.every(empty))
        this.setState({ over: true });
      else {
        if (this.state.currentPlayer.id == 1)
          this.state.currentPlayer = this.state.playerTwo;
        else
          this.state.currentPlayer = this.props.playerOne;
        this.setState(this.state);

        if (this.state.currentPlayer.type == "Computer")
          this.playCompTurn();
      }
    }
  },

  onOpponentChange: function(type) {
    this.state.selectedOpponent.type = type;
    this.setState(this.state);
  },

  setBoard: function(board, difficulty) {
    for (var i = 0; i < this.props.difficulties.length; i++) {
      if (this.props.difficulties[i].name == difficulty)
        this.props.difficulties[i].chosen = true;
      else
        this.props.difficulties[i].chosen = false;
    }
    this.state.rows = board.map(function(row) { return row.length; });
    this.setState(this.state);
  },

  onRowChange: function(index, delta) {
    var newValue = this.state.rows[index] + delta;
    if (newValue > -1 && newValue < 9) {
      this.state.rows[index] = newValue;
      this.setState(this.state);
    }
  },

  onRestart: function() {
    this.state.board = this.state.rows.map(function(qty) {
      var row = [];
      for (var i = 0; i < qty; i++)
        row.push(0);
      return row;
    });
    this.state.playerTwo = {id: 2, type: this.state.selectedOpponent.type};
    this.state.currentPlayer = this.props.playerOne;
    this.state.over = false;
    this.setState(this.state);
  },

  delayedToggle: function(row, i) {
    var interval = i * 500 + 500;
    setTimeout(function() {
      this.toggleToken(row, i)
    }.bind(this), interval);
  },

  playCompTurn: function() {
    var board = this.state.board.map(function(row) {
      return row.length;
    });
    var bestMove = getBestMove(board);
    for (var i = 0; i < bestMove[1]; i++)
      this.delayedToggle(bestMove[0], i);
    setTimeout(function() {this.onMove();}.bind(this), bestMove[1] * 500 + 600);
  },

  render: function() {
    return (
      <div className="wrapper">
        <Cover currentPlayer={this.state.currentPlayer} over={this.state.over}/>
        <Header opponent={this.state.playerTwo.type}/>
        <Game
          board={this.state.board}
          currentPlayer={this.state.currentPlayer}
          toggleToken={function(row, index)
            {this.toggleToken(row, index)}.bind(this)}
          move={this.onMove}
          onRestart={this.onRestart}
          over={this.state.over}
        />
        <Options
          selectedOpponent={this.state.selectedOpponent}
          onOpponentChange={function(type)
            {this.onOpponentChange(type)}.bind(this)}
          difficulties={this.props.difficulties}
          setBoard={function(board, difficulty) {
            this.setBoard(board, difficulty)
          }.bind(this)}
          rows={this.state.rows}
          onRowChange={
            function(index, delta) {
              this.onRowChange(index, delta)
            }.bind(this)
          }
          onRestart={this.onRestart}
        />
        <div className="description">
          Each turn you may select any number of tokens to remove from one row.
          This is a misere version of nim, meaning the player to take the last
          token loses.
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Nim />, document.getElementById("container"));
