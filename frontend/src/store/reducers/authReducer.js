import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userData: {
    userId:'',
    token: '',
    ttl: '',
  },
  loginFields: {
    username: '',
    password: '',
    error: '',
    email: '',
  },
  authentificated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EMPTY_LOGIN:
      return {
        ...state, loginFields: {
          ...state.loginFields,
          username: '',
          email: '',
          password: '',
          error: '',
        }
      };
    case actionTypes.USER_LOGIN:
      return {
        ...state, userData: {
          ...state.userData,
          userId: action.userId,
          token: action.token,
          ttl: action.ttl,
        }
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state, userData: {
          ...state.userData,
          token: action.token,
          userId: action.userId,
          ttl: action.ttl,
        }
      };
    case actionTypes.USER_LOGIN_INPUT:
      return {
        ...state, loginFields: {
          ...state.loginFields,
          [action.name]: action.value
        }
      };
    case actionTypes.SET_ERROR:
      return {
        ...state, loginFields: {
          ...state.loginFields,
          error: action.error
        }
      };
    case actionTypes.IS_AUTHENTICATED:
      return {
        ...state, authentificated: action.authentificated
      };
    case actionTypes.RESET_ERROR:
      return {
        ...state, loginFields: {
          ...state.loginFields,
          error: '',
        }
      };
    default:
      return state;
  }
};

export default reducer;
