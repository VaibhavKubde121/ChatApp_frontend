import { CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_SUCCESS, LIKE_ALL_POST_FAILURE, LIKE_ALL_POST_REQUEST, LIKE_ALL_POST_SUCCESS } from "./Post.actionType"

const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    like: null,
    comments: [],
    newComment: null

}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case LIKE_ALL_POST_REQUEST:
            return { ...state, error: null, loading: true }

        case CREATE_POST_SUCCESS:
            return {
                ...state, post: action.payload,
                posts: [action.payload, ...state.posts],
                loading: false,
                error: null
            }
        case GET_ALL_POST_SUCCESS:
        case GET_USERS_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                comments: action.payload.comments,
                loading: false,
                error: null
            }
        case LIKE_ALL_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) => item.pid === action.payload.pid ? action.payload : item),
                error: null,
                loading: false
            }
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                newComment: action.payload,
                // comments:[action.payload,...state.comments],
                error: null,
                loading: false
            }
        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case LIKE_ALL_POST_FAILURE:
            return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
}