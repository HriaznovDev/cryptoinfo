import { combineReducers } from 'redux';
import cryptoinfo from './cryptoinfo';

const appReducer = combineReducers({
    cryptoinfo
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;