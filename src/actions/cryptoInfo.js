import axios from 'axios';
import * as types from './types';

export function getInfo () {
    return dispatch => {
        dispatch(getInfoRequest());

        axios.get('https://min-api.cryptocompare.com/data/all/coinlist').then(response => {
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
    let newCryptoData = Object.assign({}, cryptoData);

    for (let key in cryptoData) {
        axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${key}&tsyms=USD`).then(response => {
            newCryptoData[key]['Price'] = response.data.USD ? response.data.USD : '';
        }).catch((error) => {
            console.error(error);
        });
    }

    return {
        type: types.GET_INFO_SUCCESS,
        loading: false,
        newCryptoData
    }
}

export function getInfoFailed (error) {
    console.error(error);

    return {
        type: types.GET_INFO_FAILED
    }
}