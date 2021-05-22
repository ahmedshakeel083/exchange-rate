import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { ratesReducer } from './rates';
import { userReducer } from './user';

// const initialState = {
//     amount: '70.00',
//     currencyCode: 'USD', 
// }

// function reducer(state = initialState, action) {
//     switch(action.type) {
//         case 'amountChanged': 
//             return { ...state, amount: action.payload };
//         case 'currencyCodeChanged': 
//             return { ...state, currencyCode: action.payload };
//         default: 
//             return state

//     }
// }

export const store = createStore(
    combineReducers({
    user: userReducer,
    rates: ratesReducer
    }),
    applyMiddleware(thunk)
);