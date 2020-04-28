import * as types from '../actions';

export default function(state = [], action) {
  let response = action.response;

  switch(action.type) {
    case types.CONTRACT_INTERACTION_SUCCESS:
      return { ...state, response };
    case types.CONTRACT_INTERACTION_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}