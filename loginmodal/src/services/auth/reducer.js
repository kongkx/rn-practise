const initialState = {
  // ui
  isLoginNavigatorVisible: false,
  isAuthing: false,
  loginError: undefined,

  // state
  token: undefined,
  user: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'auth/SHOW_MODAL':
      return {
        ...state,
        isLoginNavigatorVisible: true,
        nextRoute: action.payload.nextRoute
      };
    case 'auth/HIDE_MODAL':
      return {
        ...state,
        isLoginNavigatorVisible: false
      };
    case 'auth/auth_REQUEST':
      return {
        ...state,
        isAuthing: true
      };
    case 'auth/auth_SUCCESS':
      return {
        ...state,
        isAuthing: false
      };
    case 'auth/auth_FAILURE':
      return {
        ...state,
        isAuthing: false,
        loginError: action.payload.message
      };
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
      return {
        ...initialState,
        isLoginNavigatorVisible: Boolean(action.payload.shouldShowLoginModal)
      };
    default:
      return state;
  }
}

export const selectCurrentUser = state => state.auth.user;
export const selectHasLogin = state => Boolean(state.auth.token);
