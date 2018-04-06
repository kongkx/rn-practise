import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import reducer from './reducer';
import authMiddleware from './utils/authMiddleware';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(authMiddleware, sagaMiddleware, navigationMiddleware)
  )
);

sagaMiddleware.run(saga);

if (module.hot) {
  module.hot.accept(() => {
    const nextReducer = require('./reducer').default;
    store.replaceReducer(nextReducer);
  });
  // module.hot.accept(['../navigators/AppNavigator'], () => {
  //   // DO nothing;
  // });
}

export default store;
