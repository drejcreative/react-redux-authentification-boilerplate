import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userData: {
    username: '',
    email: '',
    id: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA:
      return {
        ...state, userData: {
          ...state.userData,
          username: action.user.username,
          email: action.user.email,
          id: action.user.id,
        }
      };
    default:
      return state;
  }
};

export default reducer;
