import { fork } from 'redux-saga/effects';

import { watchLoginRequest, watchLoginSuccess } from './services/auth/saga';

export default function* rootSaga() {
  yield fork(watchLoginRequest);
  yield fork(watchLoginSuccess);
}
