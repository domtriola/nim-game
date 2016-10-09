var Application = React.createClass({
    render: function() {
      return (
        <div className="game">
          Nim
        </div>
      );
    }
});

ReactDOM.render(<Application />, document.getElementById("container"));
