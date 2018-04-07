import { combineReducers } from 'redux';

import authReducer from './services/auth/reducer';
import navReducer from './services/nav/reducer';

export default combineReducers({
  auth: authReducer,
  nav: navReducer
});
