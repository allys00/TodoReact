import {  takeEvery, put} from 'redux-saga/effects'

function* asyncClear(action) {
    yield put({ type: 'TODO_CLEAR', payload: action.payload })
}

export default function* root() {
    yield [
        takeEvery('ASYNC_TODO_CLEAR', asyncClear)
    ]
}