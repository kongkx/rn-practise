import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions, withNavigationFocus } from 'react-navigation';

import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';

import { selectCurrentUser, selectHasLogin } from '../reducer';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class Message extends React.Component {
  // componentDidMount() {
  //   if (!this.props.hasLogin) {
  //     this.props.dispatch({
  //       type: 'login/SHOW_MODAL'
  //     });
  //   }
  // }
  // componentDidUpdate() {
  //   const focused = this.props.navigation.isFocused();
  //   console.log('focused: ', focused);
  //   if (focused && !this.props.hasLogin) {
  //     this.props.dispatch({
  //       type: 'login/SHOW_MODAL'
  //     });
  //   }
  // }
  // renderLoginModal() {
  //   return (
  //     <View>
  //       <Modal
  //         animationType="slide"
  //         transparent={false}
  //         visible={!this.props.hasLogin}
  //       >
  //         <View style={{ flex: 1, backgroundColor: 'yellow' }}>
  //           <TouchableOpacity
  //             style={{ position: 'absolute', top: 20, right: 16 }}
  //             onPress={() => this.props.dispatch(NavigationActions.back())}
  //           >
  //             <Icon name="md-arrow-back" style={{ color: 'black' }} />
  //           </TouchableOpacity>
  //           <Text>TODO LOGIN FORM</Text>
  //         </View>
  //       </Modal>
  //     </View>
  //   );
  // }
  // handleCancelLogin = () => {
  //   this.setState({
  //     showLoginModal: false
  //   });
  //   this.props.dispatch(NavigationActions.back());
  //   // setTimeout(() => {
  //   //   this.setState({
  //   //     showLoginModal: !this.props.hasLogin
  //   //   });
  //   // }, 1000);
  // };
  render() {
    console.log('render');
    const { hasLogin } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Message</Text>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const currentUser = selectCurrentUser(state);
  const hasLogin = selectHasLogin(state);
  const isFocused = props.navigation.isFocused();
  return {
    currentUser,
    hasLogin,
    isFocused
  };
};

const withConnect = connect(mapStateToProps);

export default withConnect(Message);
