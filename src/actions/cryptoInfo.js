import axios from 'axios';
import * as types from './types';

export function getInfo (maxCryptoItemsLength) {
    return dispatch => {
        dispatch(getInfoRequest());

        axios.get('https://min-api.cryptocompare.com/data/all/coinlist').then(response => {
            const cryptoData = response.data.Data;
            let bitcoinPrice;

            axios.get(
                `https://min-api.cryptocompare.com/data/price`,{
                params: {
                    fsym: 'BTC',
                    tsyms: 'USD'
                }
            }).then(response => {
                bitcoinPrice = response.data.USD || null;

                dispatch(getInfoSuccess(cryptoData, bitcoinPrice));
            }).catch((error) => {
                console.error(error);
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

export function getInfoSuccess (cryptoData, bitcoinPrice) {
    return {
        type: types.GET_INFO_SUCCESS,
        loading: false,
        payload: {
            cryptoData,
            bitcoinPrice
        }
    }
}

export function getInfoFailed (error) {
    console.error(error);

    return {
        type: types.GET_INFO_FAILED
    }
}

export function getPrice (cryptoItem) {
    return dispatch => {
        dispatch(getPriceRequest());

        axios.get(
            `https://min-api.cryptocompare.com/data/price`,{
            params: {
                fsym: cryptoItem,
                tsyms: 'USD'
            }
        }).then(response => {
            const cryptoPrice = {
                'Price': response.data.USD || null
            };

            dispatch(getPriceSuccess(cryptoItem, cryptoPrice));
        }).catch((error) => {
            dispatch(getPriceFailed(error));
        });
    };
}

export function getPriceRequest () {
    return {
        type: types.GET_PRICE_REQUEST,
        loading: true
    }
}

export function getPriceSuccess (cryptoItem, cryptoPrice) {
    return {
        type: types.GET_PRICE_SUCCESS,
        loading: false,
        payload: {
            name: cryptoItem,
            price: cryptoPrice
        }
    }
}

export function getPriceFailed (error) {
    console.error(error);

    return {
        type: types.GET_PRICE_FAILED
    }
}