import * as types from './index';

export const interactAction = (contract) => {
  return {
    type: types.CONTRACT_INTERACTION,
    contract
  }
};
