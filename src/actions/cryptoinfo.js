import axios from 'axios';
import * as types from './types';

export function getInfo () {
    return dispatch => {
        dispatch(getInfoRequest());

        axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`).then(response => {
            const cryptoData = response.data.Data;

            dispatch(getInfoSuccess(cryptoData));
        }).catch((error) => {
            dispatch(getInfoFailed(error));
        });
    };
}

export function getInfoRequest () {
    return {
        type: types.GET_INFO_REQUEST,
        loading: true
    }
}

export function getInfoSuccess (cryptoData) {
    return {
        type: types.GET_INFO_SUCCESS,
        loading: false,
        cryptoData
    }
}

export function getInfoFailed (error) {
    console.error(error);

    return {
        type: types.GET_INFO_FAILED
    }
}