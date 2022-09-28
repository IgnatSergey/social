export const getUsers = (state) => {
    return state.usersPage.users;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getCountPagesPortion = (state) => {
    return state.usersPage.countPagesPortion;
}

export const getFetchingStatus = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowStatus = (state) => {
    return state.usersPage.isFollowInProcess;
}

export const getFollowingStatus = (state, userId) => {
    console.log(state.usersPage.users);
    const currentUser = state.usersPage.users.find(user => user.id === userId);
    return currentUser.followed;
}
