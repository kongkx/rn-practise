import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';

import ExploreScreen from './Screens/Explore';
import MessageScreen from './Screens/Message';
import MeScreen from './Screens/Me';

let addListener;

export const AppNavigator = TabNavigator(
  {
    Explore: {
      screen: ExploreScreen
    },
    Message: {
      screen: MessageScreen
    },
    Me: {
      screen: MeScreen
    }
  },
  {
    lazyLoad: true
  }
);

const AppNavigatorWithState = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
      addListener
    })}
  />
);

const mapStateToProps = (state, ownProps) => {
  if (!addListener) {
    addListener = createReduxBoundAddListener('root');
  }
  return {
    nav: state.nav
  };
};

export default connect(mapStateToProps)(AppNavigatorWithState);
