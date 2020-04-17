import { CLEAR_CURRENT_ITEM, SET_CURRENT_ITEM_SUCCESS, SET_CURRENT_ITEM_ERROR, SET_ITEMS_PENDING, SET_ITEMS_SUCCESS, SET_ITEMS_ERROR, UPDATE_ITEM, REMOVE_ITEM } from '../constants'

const initialState = {
    pending: null,
    error: null,
    allItems: [],
    currentItem: {}
}

const itemReducer = (state = initialState, action) => {
    let items = [...state.allItems]
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
            const index = items.findIndex(item => item.id == action.item.id)
            items.splice(index, 1, action.item)
            let current = { ...state.currentItem }

            if (action.item.id === state.currentItem.id) {
                current = { ...action.item }
            }

            return {
                ...state,
                allItems: [...items],
                currentItem: current
            }

        case REMOVE_ITEM:

            return {
                ...state,
                allItems: [...state.allItems.filter(item => item.id !== action.item.id)]
            }
        default:
            return state
    }
}
export default itemReducer