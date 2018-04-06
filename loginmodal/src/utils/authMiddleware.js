import { NavigationActions } from 'react-navigation';
const authRequiredRoute = ['Message', 'Me'];

const authControl = store => next => action => {
  console.log('dispatching', action);
  if (action.type === NavigationActions.NAVIGATE) {
    const state = store.getState();
    const hasLogined = Boolean(state.auth.token);
    if (!hasLogined && authRequiredRoute.indexOf(action.routeName) > -1) {
      // should show middleware.
      const showModalAction = {
        type: 'login/SHOW_MODAL',
        payload: {
          nextRoute: action.routeName
        }
      };
      return next(showModalAction);
    }
  }
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

export default authControl;
