import {takeEvery} from 'redux-saga/effects';
import {logoutSaga} from './auth';
import * as actionType from '../actions/actionType';

export function* watchAuth() {
    yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
}