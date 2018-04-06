import React from 'react';
import { Provider } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import store from './store';
import AppTabNavigatorWithState from './AppNavigator';
import LoginNavigatorWithState from './LoginNavigator';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View
          style={{
            flex: 1
          }}
        >
          <AppTabNavigatorWithState />
          <LoginNavigatorWithState />
        </View>
      </Provider>
    );
  }
}

export default App;
