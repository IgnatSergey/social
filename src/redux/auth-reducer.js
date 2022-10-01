import { authAPI, securityAPI } from "../api/api";

const SET_MY_PROFILE_DATA = 'SET-MY-PROFILE-DATA';
const AUTH_ERROR = 'AUTH-ERROR';
const SET_CAPTCHA = 'SET-CAPTCHA'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    errorMessage: null,
    captcha: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_PROFILE_DATA:
            return {
                ...state, ...action.data
            }
        case AUTH_ERROR:
            return {
                ...state, errorMessage: action.errorMessage
            }
        case SET_CAPTCHA:
            return {
                ...state, captcha: action.captcha
            }
        default:
            return state;
    }
}

export const setErrorMessage = (errorMessage) => {
    return { type: AUTH_ERROR, errorMessage }
}

export const setCaptcha = (captcha) => {
    return { type: SET_CAPTCHA, captcha }
}

export const setMyProfileData = (userId, login, email, isAuth) => {
    return { type: SET_MY_PROFILE_DATA, data: { userId, email, login, isAuth } };
}

export const getMeThunkCreator = () => {
    return async (dispatch) => {
        let data = await authAPI.getMyProfile();
        if (data.resultCode === 0) {
            let { id, login, email } = data.data;
            dispatch(setMyProfileData(id, login, email, true));
        }
    }
}

export const getCaptchaThunkCreater = () => {
    return async (dispatch) => {
        let urlCaptcha = await securityAPI.getCaptcha();
        dispatch(setCaptcha(urlCaptcha));
    }
}

export const login = (email, password, rememberMe, captcha = null) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getMeThunkCreator());
            dispatch(setErrorMessage(null));
        } else if (response.data.resultCode === 10) {
            let urlCaptcha = await securityAPI.getCaptcha();
            dispatch(setCaptcha(urlCaptcha))
            dispatch(setErrorMessage("Enter code"))
        } else {
            const errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'some error';
            dispatch(setErrorMessage(errorMessage))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setMyProfileData(null, null, null, false));
        }
    };
}


export { authReducer };