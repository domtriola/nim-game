import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class Board extends Component {
  render() {
    var rowCount = 0;
    function rowId() {
      return rowCount++;
    }
    return (
      <View style={styles.container}>
        {this.props.board.map(row => <Row key={rowId()} row={row} />)}
      </View>
    );
  }
}

class Row extends Component {
  render() {
    var tokenCount = 0;
    function tokenId() {
      return tokenCount++;
    }
    let tokens = [];
    for (let i = 0; i < this.props.row.length; i++) {
      tokens.push(
        <Token
          key={tokenId()}
          selected={this.props.row[i]}
          index={i}
        />
      );
    }
    return (
      <View style={styles.row}>
        {tokens}
      </View>
    );
  }
}

class Token extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => console.log("testing")}>
        <View style={[styles.token, false && styles.chosen]} />
      </TouchableHighlight>
    );
  }
}

export default class Nim extends Component {
  constructor(props) {
    super(props);
    const board = [[0,0,0],
                   [0,0,0,0],
                   [0,0,0,0,0]];
    this.state = {
      board: board,
    };
  }

  render() {
    return (
      <Board board={this.state.board}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
  },
  token: {
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: 'teal',
    borderRadius: 50,
  },
  chosen: {
    backgroundColor: 'orange',
  },
});

AppRegistry.registerComponent('Nim', () => Nim);
