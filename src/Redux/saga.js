import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_USERS_REQUEST } from './ActionTypes/ActionTypes';
import { getuserfailure, getuserssuccces } from './Actions/Actions';
// import { fetchUsersSuccess, fetchUsersFailure } from './actions';

function* fetchUsersSaga() {
  try {
    const response = yield call(axios.get,'https://randomuser.me/api/?results=100')
  
    // console.log(response.data)
    yield put(getuserssuccces(response.data.results))
  } catch (error) {
    console.log(error,'error')
    yield put(getuserfailure(error.message))
  }
}

export default function* rootSaga() {
   
  yield takeLatest(GET_USERS_REQUEST, fetchUsersSaga)
}
