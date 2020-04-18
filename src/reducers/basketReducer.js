import { ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, UPDATE_ITEM_IN_BASKET } from '../constants'

const initialState = {
    basketItems: []
}

const basketReducer = (state = initialState, action) => {
    let items = [...state.allItems]
    switch (action.type) {

        case ADD_ITEM_TO_BASKET:
            items.splice(items.length, 1, action.item)

            return {
                ...state,
                basketItems: items
            }


        case UPDATE_ITEM_IN_BASKET:
            const index = items.findIndex(item => item.id == action.item.id)
            items.splice(index, 1, action.item)

            return {
                ...state,
                basketItems: items
            }

        case REMOVE_ITEM_FROM_BASKET:

            return {
                ...state,
                basketItems: [...state.basketItems.filter(item => item.id !== action.item.id)]
            }
        default:
            return state
    }
}
export default basketReducer
