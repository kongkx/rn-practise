import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

class Me extends React.Component {
  handleLogoutPressed = () => {
    this.props.dispatch({
      type: 'auth/LOGOUT_REQUEST'
    });
  };
  render() {
    const { user = {} } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>Me</Text>
        <Text>{user.username}</Text>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 16,
            marginVertical: 16
          }}
        >
          <Button danger block onPress={this.handleLogoutPressed}>
            <Text
              style={{
                color: 'white'
              }}
            >
              Logout
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(Me);
