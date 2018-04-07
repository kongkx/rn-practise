import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Form,
  Item,
  Input
} from 'native-base';

class LoginModal extends React.Component {
  state = {
    username: '',
    password: ''
  };
  handleBackButton = () => {
    this.props.dispatch({
      type: 'auth/HIDE_MODAL'
    });
  };
  handleLoginSubmit = () => {
    const { username, password } = this.state;
    // dispatch async request an set header. and change route.
    this.props.dispatch({
      type: 'auth/LOGIN_REQUEST',
      payload: {
        username,
        password
      }
    });
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={this.handleBackButton} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right>
            {/* <Button transparent>
              <Icon name="menu" />
            </Button> */}
          </Right>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Username"
                value={this.state.username}
                onChangeText={username => {
                  this.setState({ username });
                }}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Password"
                value={this.state.password}
                onChangeText={password => {
                  this.setState({ password });
                }}
              />
            </Item>
            <View style={styles.submitButtonContainer}>
              <Button block onPress={this.handleLoginSubmit}>
                <Text style={styles.submitButtonText}>Sign In</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    backgroundColor: 'blue',
    // flexDirection: 'row',
    marginHorizontal: 16,
    flex: 1
  },
  submitButtonContainer: {
    marginTop: 24,
    marginHorizontal: 16
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white'
  }
});

const mapStateToProps = (state, props) => {
  return state.auth;
};

export default connect(mapStateToProps)(LoginModal);
