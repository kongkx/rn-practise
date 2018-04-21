/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SocketService } from './chat/shared/services/socket.service';
import Chat from './chat/chat.component';

interface Props {}
export default class App extends React.Component<Props> {
  socketService = new SocketService();
  render() {
    return <Chat socketService={this.socketService} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
