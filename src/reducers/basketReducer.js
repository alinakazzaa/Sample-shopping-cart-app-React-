import { ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, UPDATE_ITEM_IN_BASKET, CLEAR_BASKET_STATE } from '../constants'

const initialState = {
    basketItems: [],
    basketTotal: 0
}

const basketReducer = (state = initialState, action) => {

    let items = [...state.basketItems]
    let total = state.basketTotal
    switch (action.type) {

        case ADD_ITEM_TO_BASKET:
            items.splice(items.length, 1, action.item)
            return {
                ...state,
                basketItems: items,
                basketTotal: (Number(total) + (Number(action.item.price) * Number(action.item.basketQuantity))).toFixed(2)
            }


        case UPDATE_ITEM_IN_BASKET:
            const index = items.findIndex(item => item.id === action.item.id)
            items.splice(index, 1, action.item)

            return {
                ...state,
                basketItems: [...items]
            }

        case REMOVE_ITEM_FROM_BASKET:
            console.log(total)
            return {
                ...state,
                basketItems: [...state.basketItems.filter(item => item.id !== action.item.id)],
                basketTotal: (Number(total) - (Number(action.item.price) * Number(action.item.basketQuantity))).toFixed(2)
            }

        case CLEAR_BASKET_STATE:

            return {
                ...initialState
            }
        default:
            return state
    }
}
export default basketReducer
