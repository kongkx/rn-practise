import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class LoginModal extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'yellow'
        }}
      >
        <TouchableOpacity onPress={this.props.onCancel}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={{ color: 'white' }}>LoginForm</Text>
      </View>
    );
  }
}

export default LoginModal;
