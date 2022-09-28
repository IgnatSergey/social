import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true, baseURL: 'https://social-network.samuraijs.com/api/1.0/', headers: {
        "API-KEY": "6cd31075-1129-4982-936e-2cd93641523c",
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => {
            return response.data;
        })
    },

    follow(userId) {
        return instance.post(`follow/${userId}`).then((response) => {
            return response.data
        })
    },

    unFollow(userId) {
        return instance.delete(`follow/${userId}`).then((response) => {
            return response.data;
        })
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then((response) => {
            return response.data;
        })
    },

    getProfileStatus(userId) {
        return instance.get(`profile/status/${userId}`).then((response) => {
            return response.data;
        })
    },

    getFolloedStatus(userId) {
        return instance.get(`follow/${userId}`).then((response) => {
            return response.data
        })
    },

    updateProfile(profile) {
        return instance.put(`profile`, profile).then((response) => {
            return response.data
        })
    },

    updateProfileStatus(status) {
        return instance.put(`profile/status`, { status }).then((response) => {
            return response.data
        })
    },

    updateProfilePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
            return response.data
        })
    }
}

export const authAPI = {
    getMyProfile() {
        return instance.get(`auth/me`).then((response) => {
            return response.data;
        })
    },

    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },

    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`/security/get-captcha-url`).then((response) => {
            return response.data.url;
        })
    }
}

