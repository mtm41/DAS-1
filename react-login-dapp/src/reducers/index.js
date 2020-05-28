import { combineReducers } from 'redux';
import register from './registerReducer';
import login from './loginReducer';
import interact from './interactReducer';
import credential from './credentialReducer';

const rootReducer = combineReducers({
  register, login, interact, credential
});

export default rootReducer;