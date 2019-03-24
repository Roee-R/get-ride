import { createStore, combineReducers, applyMiddleware, compose } 
from 'redux';
import thunk from 'redux-thunk'; // to run functions on to dispatch

import authReducer from '../reducers/auth';
import ridesFilterReduser from '../reducers/filters';
import ridesReducer from '../reducers/rides';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// combineReducers - for combined Reducers
const store = ()=>(
    createStore( // inital the store 
    combineReducers({ // use the combine
        auth: authReducer,
        filters: ridesFilterReduser,
        rides: ridesReducer
    }),
    composeEnhancers(applyMiddleware(thunk)) // redux middleware to run function on disptach
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // react extension to use redux devtool on the chrome
))

export default store;