import { take, call, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { fakeLoginRequest, fakeFetchUserInfo } from '../../utils/requests';

export function* watchLoginRequest() {
  while (true) {
    const action = yield take('login/LOGIN_REQUEST');
    try {
      const res = yield call(fakeLoginRequest, action.payload);
      yield put({
        type: 'auth/SET_TOKEN',
        payload: res.data.token
      });
      yield put({
        type: 'login/LOGIN_SUCCESS',
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      yield put({
        type: 'login/LOGIN_FAILURE',
        payload: err.message
      });
    }
  }
}

export function* watchLoginSuccess() {
  while (true) {
    const action = yield take('login/LOGIN_SUCCESS');
    try {
      const userInfo = yield call(fakeFetchUserInfo, action.payload.token);
      yield put({
        type: 'auth/SET_CURRENT_USER',
        payload: userInfo
      });
      const nextRoute = yield select(state => state.login.nextRoute) || 'Me';
      yield put({
        type: 'login/HIDE_MODAL'
      });
      yield put(
        NavigationActions.navigate({
          routeName: nextRoute
        })
      );
    } catch (err) {
      console.log('Initial User State Error: ', err);
      // TODO handle
    }
  }
}
