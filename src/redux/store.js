import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer";
import { authReducer } from "./auth-reducer";
import { followingReducer } from "./following-reducer";
import { profileReducer } from "./profile-reducer";
import { usersReducer } from "./users-reducer";
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({
    usersPage: usersReducer,
    profilePage: profileReducer,
    following: followingReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
})

let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

export { store };