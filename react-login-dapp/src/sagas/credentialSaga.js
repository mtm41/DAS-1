import { put, call } from 'redux-saga/effects';
import { credentialService } from '../services/credentialService';

import * as types from '../actions'

export function* credentialSaga(payload) {
  try {
    const response = yield call(credentialService, payload);
    yield [
      put({ type: types.CREDENTIAL_INTERACTION_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.CREDENTIAL_INTERACTION_ERROR, error });
  }
}

