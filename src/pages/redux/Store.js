import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './Reducers';

const rootReducer = combineReducers({
    user: userReducer,
    // add other reducers if needed
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
