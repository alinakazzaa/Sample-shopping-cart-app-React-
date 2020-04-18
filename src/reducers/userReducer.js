import { CLEAR_CURRENT_USER, SET_CURRENT_USER_SUCCESS, SET_CURRENT_USER_ERROR, SET_USERS_PENDING, SET_USERS_SUCCESS, SET_USERS_ERROR, UPDATE_USER, CLEAR_USER_STATE } from '../constants'

const initialState = {
    pending: null,
    error: null,
    allUsers: [],
    currentUser: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: { ...action.user },
                pending: false,
                error: null,
                allUsers: []
            }
        case SET_CURRENT_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: { type: action.type, message: action.message }
            }
        case CLEAR_CURRENT_USER:
            return {
                ...initialState
            }

        case SET_USERS_PENDING:

            return {
                ...state,
                pending: true
            }

        case SET_USERS_SUCCESS:

            return {
                ...state,
                allUsers: [...action.users],
                pending: false,
                error: null
            }

        case SET_USERS_ERROR:

            return {
                ...state,
                pending: false,
                error: { type: action.type, message: action.message }
            }

        case UPDATE_USER:

            return {
                ...state,
                currentUser: { ...action.user }
            }

        case CLEAR_USER_STATE:

            return {
                ...initialState
            }
        default:
            return state
    }
}
export default userReducer