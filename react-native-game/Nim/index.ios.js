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

export default class Nim extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.token}></View>
          <View style={styles.token}></View>
          <View style={styles.token}></View>
        </View>
        <View style={styles.row}>
          <View style={styles.token}></View>
          <View style={styles.token}></View>
          <View style={styles.token}></View>
          <View style={styles.token}></View>
        </View>
        <View style={styles.row}>
          <View style={styles.token}></View>
          <View style={styles.token}></View>
          <View style={styles.token}></View>
          <View style={styles.token}></View>
          <View style={styles.token}></View>
        </View>
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
