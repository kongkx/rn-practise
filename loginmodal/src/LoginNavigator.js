import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';

import LoginScreen from './Screens/Login';

class LoginNavigator extends React.Component {
  handleCancelLogin = () => {
    this.props.dispatch({
      type: 'login/HIDE_MODAL'
    });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={() => this.handleCancelLogin}
      >
        <LoginScreen onCancel={this.handleCancelLogin} />
      </Modal>
    );
  }
}

const mapStateToProps = state => state.login;

export default connect(mapStateToProps)(LoginNavigator);
