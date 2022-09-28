export const getMyUserId = (state) => {
    return state.auth.userId;
}

export const getAuthStatus = (state) => {
    return state.auth.isAuth;
}

export const getLogin = (state) => {
    return state.auth.login;
}

export const getErrorMessage = (state) => {
    return state.auth.errorMessage;
}

export const getCaptcha = (state) => {
    return state.auth.captcha;
}