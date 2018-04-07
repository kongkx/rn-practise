import { take, call, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { isAuthRequiredRoute } from './config';
import {
  fakeLoginRequest,
  fakeFetchUserInfo,
  fakeLogoutRequest
} from '../../utils/requests';

export function* watchLoginRequest() {
  while (true) {
    const action = yield take('auth/LOGIN_REQUEST');
    try {
      const res = yield call(fakeLoginRequest, action.payload);
      yield put({
        type: 'auth/SET_TOKEN',
        payload: res.data.token
      });
      yield put({
        type: 'auth/LOGIN_SUCCESS',
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      yield put({
        type: 'auth/LOGIN_FAILURE',
        payload: err.message
      });
    }
  }
}

export function* watchLoginSuccess() {
  while (true) {
    const action = yield take('auth/LOGIN_SUCCESS');
    try {
      const userInfo = yield call(fakeFetchUserInfo, action.payload.token);
      yield put({
        type: 'auth/SET_CURRENT_USER',
        payload: userInfo
      });
      const nextRoute = yield select(state => state.auth.nextRoute) || 'Me';
      yield put({
        type: 'auth/HIDE_MODAL'
      });
      yield put(
        NavigationActions.navigate({
          routeName: nextRoute
        })
      );
      yield call(watchLogout);
    } catch (err) {
      console.log('Initial User State Error: ', err);
      // TODO handle
    }
  }
}

function* watchLogout() {
  const action = yield take('auth/LOGOUT_REQUEST');
  try {
    const res = yield call(fakeLogoutRequest);
  } catch (err) {
    console.log(err);
  } finally {
    yield put({
      type: 'auth/RESET',
      payload: {}
    });
    yield put({
      type: 'nav/RESET'
    });
    // checkout
  }
}
