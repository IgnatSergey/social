import { getMeThunkCreator } from "./auth-reducer";

const INITIALIZED_SUCCSESS = 'SET-INITIALIZED';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCSESS:
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => {
    return { type: INITIALIZED_SUCCSESS };
}

export const initializeApp = () => {
    return (dispatch) => {
        const promise = dispatch(getMeThunkCreator())
        promise.then((response) => { 
            dispatch(initializedSuccess()) ;
        });
    }
}

export default appReducer ;