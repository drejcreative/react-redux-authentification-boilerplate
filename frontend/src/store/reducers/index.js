import {combineReducers} from 'redux';

import authReducer from './authReducer';
import mainAppReducer from './mainAppreducer';

const rootReducer =  combineReducers({
  auth: authReducer,
  main: mainAppReducer,
});

export default rootReducer;
