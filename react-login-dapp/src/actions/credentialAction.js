import * as types from './index';

export const credentialAction = (username) => {
  return {
    type: types.CREDENTIAL_INTERACTION,
    username
  }
};
