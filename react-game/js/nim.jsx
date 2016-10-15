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

function Cover(props) {
  var humanStyle = {};
  var compStyle = {
    position: 'absolute',
    width: '500px',
    height: '500px',
  };
  var coverStyle = props.currentPlayer.type == "Computer" ? compStyle : humanStyle;

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
  var apos = "'"; // hack to avoid atom highlighting bug
  var rowCounter = 1;
  function rowId() {
    return rowCounter++;
  }

  return (
    <div id="game">
      <div className="player-turn">Player {props.currentPlayer.id}{apos}s Turn</div>
      <div className="board">
        {props.board.map(function(row, rowIndex) {
          return (
            <Row row={row} key={rowId()} toggleToken={function(index)
              {props.toggleToken(rowIndex, index)}}/>
          );
        })}
      </div>
      <button id="move" onClick={function() {props.move();}}>Move</button>
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
  return (
    <div id="options">
      <div className="setup">
        <div className="choose-opponent">
          <div>Choose Opponent: </div>
          <OpponentButtons
            playerTwo={props.playerTwo}
            onOpponentChange={props.onOpponentChange}
          />
        </div>
        {props.rows.map(function(num, index) {
          return (
            <OptionRow key={optRowId()} num={num} index={index}
            onRowChange={props.onRowChange}/>
          );
        })}
        <button id="restart" onClick={function() {props.onRestart();}}>Restart</button>
      </div>
    </div>
  );
}
function OpponentButtons(props) {
  var type = props.playerTwo.type;
  var changeOpponent = function(opponentType) {
    props.onOpponentChange(opponentType);
  }
  return (
    <div className="opponent-choice">
      <button className={type == "Human" ? "selected" : " "}
        onClick={function() {changeOpponent("Human")}}>Human</button>
      <button className={type == "Computer" ? "selected" : " "}
        onClick={function() {changeOpponent("Computer")}}>Computer</button>
    </div>
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

var Application = React.createClass({
  propTypes: {
    initialBoard: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(React.PropTypes.number)),
    initialRows: React.PropTypes.arrayOf(React.PropTypes.number),
    startingPlayer: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      initialBoard: [[0,0,0],
                     [0,0,0,0],
                     [0,0,0,0,0],
                     []],
      initialRows: [4,5,6,0],
      playerOne: {id: 1, type: "Human"},
    };
  },

  getInitialState: function() {
    return {
      board: this.props.initialBoard,
      rows: this.props.initialRows,
      currentPlayer: this.props.playerOne,
      playerTwo: {id: 2, type: "Human"}
    }
  },

  toggleToken: function(row, index) {
    this.state.board[row][index] = this.state.board[row][index] == 0 ? 1 : 0;
    this.setState(this.state);
  },

  onMove: function() {
    this.state.board = this.state.board.map(function(row) {
      return row.filter(function(token) {return token == 0});
    });
    if (this.state.currentPlayer.id == 1)
      this.state.currentPlayer = this.state.playerTwo;
    else
      this.state.currentPlayer = this.props.playerOne;
    this.setState(this.state);
    if (this.state.currentPlayer.type == "Computer")
      this.playCompTurn();
  },

  onOpponentChange: function(type) {
    this.state.playerTwo.type = type;
    this.setState(this.state);
  },

  onRowChange: function(index, delta) {
    this.state.rows[index] += delta;
    this.setState(this.state);
  },

  onRestart: function() {
    this.state.board = this.state.rows.map(function(qty) {
      var row = [];
      for (var i = 0; i < qty; i++)
        row.push(0);
      return row;
    });
    this.setState(this.state);
  },

  playCompTurn: function() {
    var board = this.state.board.map(function(row) {
      return row.length;
    });
    console.log(nimSum(board));
    this.onMove();
  },

  render: function() {
    return (
      <div className="wrapper">
        <Cover currentPlayer={this.state.currentPlayer}/>
        <Header opponent={this.state.playerTwo.type}/>
        <Game
          board={this.state.board}
          currentPlayer={this.state.currentPlayer}
          toggleToken={function(row, index)
            {this.toggleToken(row, index)}.bind(this)}
          move={this.onMove}
        />
        <Options
          playerTwo={this.state.playerTwo}
          onOpponentChange={function(type)
            {this.onOpponentChange(type)}.bind(this)}
          rows={this.state.rows}
          onRowChange={function(index, delta)
            {this.onRowChange(index, delta)}.bind(this)}
          onRestart={this.onRestart}
        />
      </div>
    );
  }
});

ReactDOM.render(<Application />, document.getElementById("container"));
