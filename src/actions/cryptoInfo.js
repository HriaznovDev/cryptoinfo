import axios from 'axios';
import * as types from './types';

export function getInfo (maxCryptoItemsLength) {
    return dispatch => {
        dispatch(getInfoRequest());

        axios.get('https://min-api.cryptocompare.com/data/all/coinlist').then(response => {
            const cryptoData = response.data.Data;
            
            Promise.all(
                Object.keys(cryptoData)
                .filter((item, i) => i < maxCryptoItemsLength)
                .map(cryptoItem => axios.get(
                    `https://min-api.cryptocompare.com/data/price`,{
                    params: {
                        fsym: cryptoItem,
                        tsyms: 'USD'
                    }
                }).then(response => {
                    cryptoData[cryptoItem].Price = response.data.USD || 'Unknown';

                    return cryptoData[cryptoItem];
                })
            )).then((totalData) => {
                dispatch(getInfoSuccess(totalData));
            });
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