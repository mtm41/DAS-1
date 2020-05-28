import * as types from '../actions';

export default function(state = [], action) {
  let response = action.response;

  switch(action.type) {
    case types.CREDENTIAL_INTERACTION_SUCCESS:
      return { ...state, response };
    case types.CREDENTIAL_INTERACTION_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}