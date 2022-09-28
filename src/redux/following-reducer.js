const TOGGLE_FOLLOWING_STATUS = 'TOGGLE-FOLLOWING-STATUS';

let initialState = {
    isFollowingInProcess: []
}

export const followingReducer = (state = initialState, action) => {
    switch (action.type) {
            case TOGGLE_FOLLOWING_STATUS:
                return {
                    ...state, isFollowingInProcess: action.isFollowed ? [...state.isFollowingInProcess, action.userId] : state.isFollowingInProcess.filter(userId => userId !== action.userId)
                }
        default:
            return state;
    }
}

export const toggleFollowingStatus = (userId, isFollowed) => {
    return { type: TOGGLE_FOLLOWING_STATUS, userId, isFollowed }
}

export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreater) => {
    dispatch(toggleFollowingStatus(userId, true));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreater(userId));
    }
    dispatch(toggleFollowingStatus(userId, false));
}