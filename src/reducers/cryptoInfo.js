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
                data: action.payload
            });

        case types.GET_INFO_FAILED:
            return state;

        case types.GET_PRICE_REQUEST:
            return Object.assign({}, state, {
                loading: action.loading
            });

        case types.GET_PRICE_SUCCESS:
            const newCryptoData = {
                [action.payload.name]: Object.assign(
                    {}, 
                    state.data[action.payload.name], 
                    action.payload.price
                )
            };

            return Object.assign({}, state, {
                loading: action.loading,
                data: Object.assign({}, state.data, newCryptoData)
            });

        case types.GET_PRICE_FAILED:
            return state;

        default:
            return state;
    }
};

export default cryptoInfo;