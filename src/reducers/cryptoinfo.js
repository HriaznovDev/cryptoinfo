import * as types from '../actions/types';

const cryptoinfo = (state = {}, action) => {
    switch (action.type) {
        case types.GET_INFO_REQUEST:
            return state;

        case types.GET_INFO_SUCCESS:
            return Object.assign({}, state, action.newsData);

        case types.GET_INFO_FAILED:
            return state;

        default:
            return state;
    }
};

export default cryptoinfo;