import { ratesReducer } from "./rates";

const initialState = {
    name: 'Shakeel Ahmed',
    loggedIn: false, 
}

export function userReducer(state = initialState, action){
    return state;
}

//selector

export const getName = state => {
    return state.user.name.split(' ')[0];
};