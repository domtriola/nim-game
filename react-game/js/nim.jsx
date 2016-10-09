// Structure

// Game board with tokens that can be reset
//   - tokens toggle chosen or not

// Controls
//   - chose move
//   - set # of tokens per row
//   - allow player to play against another player

function Header() {
  return (
    <div className="header">
      <h1>Nim</h1>
      <h2>Human Vs. Computer</h2>
    </div>
  );
}

function Game() {
  return (
    <div id="game">
      <div class="player-turn">Player 1's Turn</div>
      <div className="board">
        <Row />
        <Row />
      </div>
      <button id="move">Move</button>
    </div>
  );
}
function Row() {
  return (
    <div className="row">
      <Token />
      <Token />
      <Token />
    </div>
  );
}
var Token = React.createClass({
  render: function() {
    return (
      <div is data-chosen="false" class="token"></div>
    );
  }
});

function Options() {
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
        <div className="row">
          <div className="row-number"> Row 1 </div>
          <button className="decrement"> - </button>
          <div className="row-quantity"> 3 </div>
          <button className="increment"> + </button>
        </div>
        <div className="row">
          <div className="row-number"> Row 2 </div>
          <button className="decrement"> - </button>
          <div className="row-quantity"> 4 </div>
          <button className="increment"> + </button>
        </div>
        <button id="restart">Restart</button>
      </div>
    </div>
  );
}

var Application = React.createClass({
  propTypes: {
    initialBoard: React.PropTypes.arrayOf(React.PropTypes.number)
  },

  getDefaultProps: function() {
    return {
      initialBoard: [3,4,5],
    };
  },

  render: function() {
    return (
      <div className="wrapper">
        <Header />
        <Game />
        <Options />
      </div>
    );
  }
});

ReactDOM.render(<Application />, document.getElementById("container"));
