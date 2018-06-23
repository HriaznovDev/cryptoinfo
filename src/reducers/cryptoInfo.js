import * as types from '../actions/types';

const cryptoInfo = (state = {}, action) => {
    switch (action.type) {
        case types.GET_INFO_REQUEST:
            return Object.assign({}, state, {
                loading: action.loading
            });

        case types.GET_INFO_SUCCESS:
            return Object.assign({}, state, {
                loading: action.loading,
                data: action.cryptoData
            });

        case types.GET_INFO_FAILED:
            return state;

        default:
            return state;
    }
};

export default cryptoInfo;