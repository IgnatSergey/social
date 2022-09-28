import { usersAPI } from "../api/api";
import { followUnfollowFlow } from "./following-reducer";

const SET_USERS = 'SET-USERS';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const FOLLOW = 'FOLLOW_AT_USERS';
const UNFOLLOW = 'UNFOLLOW_AT_USERS';
const TOGGLE_FETCHING = 'TOGGLE-FETCHING-USERS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    countPagesPortion: 10,
    isFetching: false,
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: [...action.users] }
        case SET_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case TOGGLE_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
            case FOLLOW:
                return {
                    ...state, users: state.users.map((user) => {
                        if (user.id === action.userId) {
                            return { ...user, followed: true }
                        }
                        return user;
                    })
                }
            case UNFOLLOW:
                return {
                    ...state, users: state.users.map((user) => {
                        if (user.id === action.userId) {
                            return { ...user, followed: false }
                        }
                        return user;
                    })
                }
        default:
            return state;
    }
}

export const setUsers = (users) => {
    return { type: SET_USERS, users }
}

export const setTotalUsersCount = (totalUsersCount) => {
    return { type: SET_TOTAL_COUNT, totalUsersCount }
}

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(toggleFetching(false));
    }
}

export const setCurrentPage = (currentPage) => {
    return { type: SET_CURRENT_PAGE, currentPage }
}

const toggleFetching = (fetchingStatus) => {
    return { type: TOGGLE_FETCHING, isFetching: fetchingStatus }
}

const follow = (userId) => {
    return { type: FOLLOW, userId }
}

const unFollow = (userId) => {
    return { type: UNFOLLOW, userId }
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

