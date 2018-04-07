import { NavigationActions } from 'react-navigation';
import { isAuthRequiredRoute } from './config';

const authControl = store => next => action => {
  if (action.type === NavigationActions.NAVIGATE) {
    const state = store.getState();
    const hasLogined = Boolean(state.auth.token);
    if (!hasLogined && isAuthRequiredRoute(action.routeName)) {
      // should show middleware.
      const showModalAction = {
        type: 'auth/SHOW_MODAL',
        payload: {
          nextRoute: action.routeName
        }
      };
      return next(showModalAction);
    }
  }
  // else if (action.type === 'auth/RESET') {
  //   const navState = store.getState().nav;
  //   const currentRoute = navState.routes[navState.index];
  //   if (isAuthRequiredRoute(currentRoute.routeName)) {
  //     action.payload = {
  //       ...action.payload,
  //       shouldShowLoginModal: true,
  //       prevRoute: 'Explore' // TODO
  //     };
  //   }
  // }
  let result = next(action);
  return result;
};

export default authControl;
