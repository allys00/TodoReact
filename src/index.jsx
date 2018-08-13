import React from 'react'
import ReactDOM from 'react-dom'
import "regenerator-runtime/runtime";


import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './todo/todoSagas'

import App from './main/app'
import reducers from './main/reducers'



const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()

const sagaMiddleware = createSagaMiddleware()

const store = applyMiddleware(sagaMiddleware,thunk, multi, promise)(createStore)(reducers, devTools)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'))
