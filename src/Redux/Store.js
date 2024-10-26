import React from 'react'
import {  applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { reducer as userReducer } from './Reducers/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const rootReducer = combineReducers({
    userReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = legacy_createStore(rootReducer,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
