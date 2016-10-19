/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Row extends Component {
  render() {
    return (
      <View style={styles.row}>
        {this.props.row.map(token => <Token />)}
      </View>
    );
  }
}

class Token extends Component {
  render() {
    return (
      <View style={styles.token}></View>
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
      <View style={styles.container}>
        {this.state.board.map(row => <Row row={row} />)}
      </View>
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
  },
});

AppRegistry.registerComponent('Nim', () => Nim);
