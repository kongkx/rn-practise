const initialState = {
  isVisible: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'login/SHOW_MODAL':
      return {
        ...state,
        isVisible: true,
        nextRoute: action.payload.nextRoute
      };
    case 'login/HIDE_MODAL':
      return {
        ...state,
        isVisible: false
      };
    case 'login/LOGIN_REQUEST':
      return {
        ...state,
        isLogining: true
      };
    case 'login/LOGIN_SUCCESS':
      return {
        ...state,
        isLogining: false
      };
    case 'login/LOGIN_FAILURE':
      return {
        ...state,
        isLogining: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
