// import axios from 'axios';
// import {config} from '../../config';
import * as actionTypes from './actionTypes';

export const emptyLogin = () => {
  return {
    type: actionTypes.EMPTY_LOGIN,
  };
};

export const setError = error => {
  return {
    type: actionTypes.SET_ERROR,
    error: error,
  };
};

export const resetError = error => {
  return {
    type: actionTypes.RESET_ERROR,
  };
};

export const userLogin = user => {
  return {
    type: actionTypes.USER_LOGIN,
    userId: user.userId,
    token: user.token,
    ttl: user.ttl,
  };
};

export const isAuthenticated = auth => {
  return {
    type: actionTypes.IS_AUTHENTICATED,
    authentificated: auth,
  };
};

export const setToken = data => {
  return {
    type: actionTypes.SET_TOKEN,
    token: data.token,
    userId: data.userId,
    ttl: data.ttl,
  };
};

export const userInputTyping = input => {
  return {
    type: actionTypes.USER_LOGIN_INPUT,
    name: input.name,
    value: input.value,
  };
};
