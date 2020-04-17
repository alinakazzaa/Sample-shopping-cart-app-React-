import { CLEAR_CURRENT_ITEM, SET_CURRENT_ITEM_SUCCESS, SET_CURRENT_ITEM_ERROR, SET_ITEMS_PENDING, SET_ITEMS_SUCCESS, SET_ITEMS_ERROR, UPDATE_ITEM } from '../constants'

const initialState = {
    pending: null,
    error: null,
    allItems: [],
    currentItem: {}
}

const itemReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CURRENT_ITEM_SUCCESS:
            return {
                ...state,
                currentItem: { ...action.item },
                pending: false,
                error: null
            }
        case SET_CURRENT_ITEM_ERROR:
            return {
                ...state,
                pending: false,
                error: { type: action.type, message: action.message }
            }
        case CLEAR_CURRENT_ITEM:
            return {
                ...state,
                currentItem: {}
            }

        case SET_ITEMS_PENDING:

            return {
                ...state,
                pending: true
            }

        case SET_ITEMS_SUCCESS:

            return {
                ...state,
                allItems: [...action.items],
                pending: false,
                error: null
            }

        case SET_ITEMS_ERROR:

            return {
                ...state,
                pending: false,
                error: { type: action.type, message: action.message }
            }

        case UPDATE_ITEM:

            return {
                ...state,
                currentItem: { ...action.item }
            }
        default:
            return state
    }
}
export default itemReducer