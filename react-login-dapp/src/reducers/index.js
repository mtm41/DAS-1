import { combineReducers } from 'redux';
import register from './registerReducer';
import login from './loginReducer';
import interact from './interactReducer';

const rootReducer = combineReducers({
  register, login, interact
});

export default rootReducer;