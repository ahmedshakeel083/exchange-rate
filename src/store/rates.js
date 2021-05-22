import { getExchangeRates } from '../api';

const initialState = {
    amount: '70.00',
    currencyCode: 'USD', 
    currencyData: { USD:{
        label: 'US Dollars',
        code: 'USD',
        rate: 1.0
    }},
    supportedCurrencies: ["USD", "EUR", "JPY", "CAD", "GBP", "MXN"],    
}

export function ratesReducer(state = initialState, action) {
    switch(action.type) {
        case AMOUNT_CHANGED: 
            return { ...state, amount: action.payload };
        case CURRENCY_CODE_CHANGED: 
            return { ...state, currencyCode: action.payload };
        case LABEL_RECIEVED: {
            const { label, currencyCode } = action.payload;
            return { 
                ...state,
                currencyData: {
                    ...state.currencyData,
                    [currencyCode]: {
                        ...state.currencyData[currencyCode],
                        label,
                    },
                },
                // currencyData: state.currencyData.map(data => {
                //     if(currencyCode === data.code){
                //         return { ...data, label}
                //     }
                //     return data;
                // })
            };
        }
        case RATES_RECIEVED: {
            const currencyCodes = Object.keys(action.payload).concat(state.currencyCode);
            const currencyData = {};
            for(let code in action.payload){
                currencyData[code] = { code, rate: action.payload[code] };
            }
            return { ...state, currencyData, supportedCurrencies: currencyCodes };
        }
        default: 
            return state

    }
}

//selector

export const getAmount = state => state.rates.amount;
export const getCurrencyCode = state => state.rates.currencyCode;
export const getCurrencyData = state => state.rates.currencyData;
export const getSupportedCurrencies = state => state.rates.supportedCurrencies;
export const getLabel = (state, currencyCode) => {
    // const match = state.rates.currencyData.find(data => data.code === currencyCode)
    const match = state.rates.currencyData[currencyCode]
    if(match) return match.label
}

// action type

export const AMOUNT_CHANGED = 'rates/amountChanged';
export const CURRENCY_CODE_CHANGED = 'rates/currencyCodeChanged';
export const RATES_RECIEVED = 'rates/ratesRecieved';
export const LABEL_RECIEVED = 'rates/labelRecieved';

// action creators

export const changeAmount = amount => ({
    type: AMOUNT_CHANGED,
    payload: amount,
})

export const changeCurrencyCode = currencyCode => {
    return function changeCurrencyCodeThunk(dispatch, getState){
        const state = getState();
        const supportedCurrencies = getSupportedCurrencies(state);
        dispatch({
            type: CURRENCY_CODE_CHANGED,
            payload: currencyCode,
        });
        getExchangeRates(currencyCode, supportedCurrencies)
        .then(rates => {
            dispatch({
                type: RATES_RECIEVED,
                payload: rates
            })
        })
    }
} 

//thunks
export const getInitialRates = (dispatch, getState) =>{
    const state = getState();
    const currencyCode = getCurrencyCode(state);
    dispatch(changeCurrencyCode(currencyCode));
}
