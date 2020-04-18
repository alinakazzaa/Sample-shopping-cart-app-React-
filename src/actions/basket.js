import { ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, UPDATE_ITEM_IN_BASKET } from '../constants/index.js'

export const addItemToBasket = item => {
    return {
        type: ADD_ITEM_TO_BASKET,
        item
    }
}

export const updateBasketItem = item => {
    return {
        type: UPDATE_ITEM_IN_BASKET,
        item
    }
}

export const removeBasketItem = item => {
    return {
        type: REMOVE_ITEM_FROM_BASKET,
        item
    }
}
