import { AppNavigator } from '../../AppNavigator';

const action = AppNavigator.router.getActionForPathAndParams('Explore');
const initialNavState = AppNavigator.router.getStateForAction(action);

export default function nav(state = initialNavState, action) {
  if (action.type === 'nav/RESET') {
    return initialNavState;
  }
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export const selectCurrentRoute = state => {
  const navState = state.nav;
  return navState.routes[navState.index];
};
