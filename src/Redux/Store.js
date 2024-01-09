import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/auth.reducer";
import { thunk } from "redux-thunk";
import { postReducer } from "./Post/Post.reducer";
import { messageReducer } from "./Message/Message.reduce"

const rootReducer = combineReducers({
    post: postReducer,
    auth: authReducer,
    message: messageReducer
})

export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk))

