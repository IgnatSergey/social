export const getProfile = (state) => {
    return state.profilePage.profile;
}

export const getProfileStatus = (state) => {
    return state.profilePage.status;
}

export const getProfileFolowedStatus = (state) => {
    return state.profilePage.isFollowed;
}

export const getFollowStatusss = (state) => {
    return state.profilePage.isFollowInProcesss;
}

export const getFetchingStatus = (state) => {
    return state.profilePage.isFetching;
}

export const getTypeProfile = (state) => {
    return state.profilePage.isMyProfile;
}

export const getEditModeStatus = (state) => {
    return state.profilePage.isEditMode;
}

export const getErrorMessage = (state) => {
    return state.profilePage.errorMessage;
}