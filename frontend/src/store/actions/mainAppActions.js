import * as actionTypes from './actionTypes';

export const getUSerData = user => {
  return {
    type: actionTypes.GET_USER_DATA,
    user,
  };
};
