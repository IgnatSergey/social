import { profileAPI, usersAPI } from "../api/api";
import { followUnfollowFlow } from "./following-reducer";

const SET_PROFILE = 'SET-PROFILE';
const GET_PROFILE_ERROR = 'GET-PROFILE-ERROR';
const SET_STATUS = 'SET-STATUS';
const SET_FOLLOWING_STATUS = 'SET-FOLLOWED-STATUS';
const FOLLOW = 'FOLLOW_AT_PROFILE';
const UNFOLLOW = 'UNFOLLOW_AT_PROFILE';
const TOGGLE_FETCHING = 'TOGGLE-FETCHING-PROFILE';
const TOGGLE_TYPE_PROFILE = 'TOGGLE-TYPE-PROFILE';
const TOGGLE_EDIT_MODE = 'TOGGLE-EDIT-MODE';

let initialState = {
    profile: null,
    status: '',
    isFollowed: false,
    isFetching: true,
    isMyProfile: false,
    isEditMode: false,
    errorMessage: null,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE: {
            return {
                ...state, profile: { ...action.profile, contacts: action.profile.contacts }
            }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case SET_FOLLOWING_STATUS: {
            return {
                ...state, isFollowed: action.statusFollowed
            }
        }
        case FOLLOW:
            return {
                ...state, isFollowed: true
            }
        case UNFOLLOW:
            return {
                ...state, isFollowed: false
            }
        case TOGGLE_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_TYPE_PROFILE:
            return {
                ...state, isMyProfile: action.isMyProfile
            }
        case TOGGLE_EDIT_MODE:
            return {
                ...state, isEditMode: action.isEditMode
            }
        case GET_PROFILE_ERROR:
            return {
                ...state, errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}

const getProfile = (profile) => {
    return { type: SET_PROFILE, profile }
}

export const setErrorMessageProfile = (errorMessage) => {
    return { type: GET_PROFILE_ERROR, errorMessage }
}

export const getProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFetching(true));
        const dataProfile = await profileAPI.getProfile(userId);
        dispatch(getProfile(dataProfile));
        const dataStatus = await profileAPI.getProfileStatus(userId);
        dispatch(setProfileStatus(dataStatus));
        const dataFollowing = await profileAPI.getFolloedStatus(userId);
        dispatch(setFollowingStatus(dataFollowing));
        dispatch(toggleFetching(false));
    }
}

const setProfileStatus = (status) => {
    return { type: SET_STATUS, status }
}

export const getProfileStatusThunkCreator = (userId) => {
    return async (dispatch) => {
        const data = await profileAPI.getProfileStatus(userId);
        dispatch(setProfileStatus(data));
    }
}

export const setFollowingStatus = (statusFollowed) => {
    return { type: SET_FOLLOWING_STATUS, statusFollowed }
}

export const getFollowedStatusThunkCreator = (userId) => {
    return async (dispatch) => {
        const data = await profileAPI.getFolloedStatus(userId);
        dispatch(setFollowingStatus(data));
    }
}

const toggleFetching = (fetchingStatus) => {
    return { type: TOGGLE_FETCHING, isFetching: fetchingStatus }
}

const follow = () => {
    return { type: FOLLOW }
}

const unFollow = () => {
    return { type: UNFOLLOW }
}

export const followThunkCreator = (userId) => {
    return (dispatch) => {
        const actionCreater = follow;
        const apiMethod = usersAPI.follow.bind(userId);
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreater)
    }
}

export const unFollowThunkCreator = (userId) => {
    return (dispatch) => {
        const actionCreater = unFollow;
        const apiMethod = usersAPI.unFollow.bind(userId);
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreater)
    }
}

export const toggleTypeProfile = (isMyProfile) => {
    return { type: TOGGLE_TYPE_PROFILE, isMyProfile }
}

export const toggleEditMode = (isEditMode) => {
    return { type: TOGGLE_EDIT_MODE, isEditMode }
}

export const updateProfileThunkCreator = (profile) => {
    return async (dispatch) => {
        const data = await profileAPI.updateProfile(profile);
        if (data.resultCode === 0) {
            dispatch(getProfile(profile));
        }
        else {
            const errorMessage = data.messages.length > 0 ? data.messages[0] : 'some error';
            dispatch(setErrorMessageProfile(errorMessage))
        }
    }
}

export const updateProfileStatusThunkCreator = (status) => {
    return async (dispatch) => {
        const data = await profileAPI.updateProfileStatus(status);
        if (data.resultCode === 0) {
            dispatch(setProfileStatus(status));
        }
    }
}

export const updateProfilePhotoThunkCreator = (photo) => {
    return async () => {
        await profileAPI.updateProfilePhoto(photo);
    }
}

export { profileReducer }