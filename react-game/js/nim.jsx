// Structure

// Game board with tokens that can be reset
//   - tokens toggle chosen or not

// Controls
//   - chose move
//   - set # of tokens per row
//   - allow player to play against another player


var Application = React.createClass({
    render: function() {
      return (
        <div>
          <div className="header">
            <h1>Nim</h1>
            <h2>Human Vs. Computer</h2>
          </div>
          <div id="game">
            <div class="player-turn">Player 1's Turn</div>
            <div className="board">
              <div className="row">
                <div className="token"></div>
                <div className="token"></div>
                <div className="token"></div>
              </div>
              <div className="row">
                <div className="token"></div>
                <div className="token"></div>
                <div className="token"></div>
                <div className="token"></div>
              </div>
            </div>
            <button id="move">Move</button>
          </div>
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
        </div>
      );
    }
});

ReactDOM.render(<Application />, document.getElementById("container"));
