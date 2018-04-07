const authRequiredRoute = ['Message', 'Me'];
export const isAuthRequiredRoute = routeName =>
  authRequiredRoute.indexOf(routeName) > -1;
