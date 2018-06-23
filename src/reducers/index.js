import { combineReducers } from 'redux';
import cryptoInfo from './cryptoInfo';

const appReducer = combineReducers({
    cryptoInfo
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;