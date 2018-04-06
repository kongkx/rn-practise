import { combineReducers } from 'redux';
import { AppNavigator } from './AppNavigator';
import loginReducer from './Screens/Login/reducer';

const initialAuthState = {
  token: undefined,
  user: undefined
};

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'auth/SET_TOKEN':
      return {
        ...state,
        token: action.payload
      };
    case 'auth/SET_CURRENT_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'auth/RESET':
      return initialAuthState;
    default:
      return state;
  }
}

const action = AppNavigator.router.getActionForPathAndParams('Explore');
const initialNavState = AppNavigator.router.getStateForAction(action);

function nav(state = initialNavState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default combineReducers({
  auth,
  nav,
  login: loginReducer
});

export const selectCurrentUser = state => state.auth.user;
export const selectHasLogin = state => Boolean(state.auth.token);
