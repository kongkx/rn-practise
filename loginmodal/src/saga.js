import { fork } from 'redux-saga/effects';

import { watchLoginRequest, watchLoginSuccess } from './Screens/Login/saga';

export default function* rootSaga() {
  yield fork(watchLoginRequest);
  yield fork(watchLoginSuccess);
}
