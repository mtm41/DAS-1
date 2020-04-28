import { put, call } from 'redux-saga/effects';
import { interactService } from '../services/interactService';

import * as types from '../actions'

export function* interactSaga(payload) {
  try {
    const response = yield call(interactService, payload);
    yield [
      put({ type: types.CONTRACT_INTERACTION_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.CONTRACT_INTERACTION_ERROR, error });
  }
}

