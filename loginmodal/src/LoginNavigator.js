import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';

import LoginScreen from './Screens/Login';

class LoginNavigator extends React.Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isLoginNavigatorVisible}
        onRequestClose={() => this.handleCancelLogin}
      >
        <LoginScreen />
      </Modal>
    );
  }
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(LoginNavigator);
