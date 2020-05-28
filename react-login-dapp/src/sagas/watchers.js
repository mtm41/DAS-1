import { takeLatest } from 'redux-saga/effects';
import { registerSaga, loginSaga } from './authenticationSaga';
import { interactSaga } from './interactSaga';
import { credentialSaga } from './credentialSaga';

import * as types from '../actions';


export default function* watchUserAuthentication() {
  yield takeLatest(types.REGISTER_USER, registerSaga);
  yield takeLatest(types.LOGIN_USER, loginSaga);
  yield takeLatest(types.CONTRACT_INTERACTION, interactSaga);
  yield takeLatest(types.CREDENTIAL_INTERACTION, credentialSaga);
}