// Structure

// Game board with tokens that can be reset
//   - tokens toggle chosen or not

// Controls
//   - chose move
//   - set # of tokens per row
//   - allow player to play against another player

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
  return (
    <div id="game">
      <div class="player-turn">Player {props.currentPlayer}{apos}s Turn</div>
      <div className="board">
        {props.board.map(function(row, rowIndex) {
          return (
            <Row row={row} toggleToken={function(index)
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
  for (var i = 0; i < props.row.length; i++)
    tokens.push(
      <Token selected={props.row[i]}
        index = {i}
      toggle={props.toggleToken}/>
    );
  return (
    <div className="row">
      {tokens}
    </div>
  );
}
function Token(props) {
  if (props.selected) {
    return (<div className="token chosen"
      onClick={function() {props.toggle(props.index);}}></div>);
  } else {
    return (<div className="token"
      onClick={function() {props.toggle(props.index);}}></div>);
  }
}

function Options(props) {
  return (
    <div id="options">
      <div className="setup">
        <div className="choose-opponent">
          <div>Choose Opponent: </div>
          <div className="opponent-choice">
            <button>Human</button>
            <button>Computer</button>
          </div>
        </div>
        {props.rows.map(function(num, index) {
          return (
            <div className="row">
              <div className="row-number"> Row {index + 1} </div>
              <button className="decrement"
                onClick={function() {props.onRowChange(index, -1);}}> - </button>
              <div className="row-quantity"> {num} </div>
              <button className="increment"
                onClick={function() {props.onRowChange(index, 1);}}> + </button>
            </div>
          );
        })}
        <button id="restart" onClick={function() {props.onRestart();}}>
          Restart
        </button>
      </div>
    </div>
  );
}

var Application = React.createClass({
  propTypes: {
    initialBoard: React.PropTypes.arrayOf(React.PropTypes.number),
    initialRows: React.PropTypes.arrayOf(React.PropTypes.number),
    opponent: React.PropTypes.string,
    startingPlayer: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      initialBoard: [[0,0,0],
                     [0,0,0,0],
                     [0,0,0,0,0]],
      initialRows: [4,5,6,0],
      opponent: "Computer",
      startingPlayer: 1,
    };
  },

  getInitialState: function() {
    return {
      board: this.props.initialBoard,
      rows: this.props.initialRows,
      currentPlayer: this.props.startingPlayer,
    }
  },

  toggleToken: function(row, index) {
    this.state.board[row][index] = this.state.board[row][index] == 0 ? 1 : 0;
    this.setState(this.state);
  },

  onMove: function(move) {
    this.state.board = this.state.board.map(function(row) {
      return row.filter(function(token) {return token == 0});
    });
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

  render: function() {
    return (
      <div className="wrapper">
        <Header opponent={this.props.opponent}/>
        <Game
          opponent={this.props.opponent}
          board={this.state.board}
          currentPlayer={this.state.currentPlayer}
          toggleToken={function(row, index)
            {this.toggleToken(row, index)}.bind(this)}
          move={this.onMove}
        />
        <Options
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
