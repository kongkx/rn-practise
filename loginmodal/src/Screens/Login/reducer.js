const initialState = {
  isVisible: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'login/SHOW_MODAL':
      return {
        ...state,
        isVisible: true
      };
    case 'login/HIDE_MODAL':
      return {
        ...state,
        isVisible: false
      };
    default:
      return state;
  }
}
