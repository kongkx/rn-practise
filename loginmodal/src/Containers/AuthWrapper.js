import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

class Authed extends React.Component {
  componentDidMount() {
    const { auth } = this.props;
    if (!auth.token) {
      this.props.dispatch({
        type: 'login/SHOW_MODAL'
      });
    }
  }
  componentDidUpdate() {}
  render() {}
}

const mapStateToProps = state => state.auth;
const withConnect = connect(mapStateToProps);

export default compose(withNavigationFocus, withConnect)(Authed);
