import { CLEAR_CURRENT_ORDER, SET_CURRENT_ORDER_SUCCESS, SET_CURRENT_ORDER_ERROR, SET_ORDERS_PENDING, SET_ORDERS_SUCCESS, SET_ORDERS_ERROR, UPDATE_ORDER, REMOVE_ORDER, CLEAR_ORDER_STATE, ADD_ORDER } from '../constants'

const initialState = {
    pending: null,
    error: null,
    allOrders: [],
    currentOrder: {}
}

const orderReducer = (state = initialState, action) => {
    let orders = [...state.allOrders]
    switch (action.type) {

        case SET_CURRENT_ORDER_SUCCESS:
            return {
                ...state,
                currentOrder: { ...action.order },
                pending: false,
                error: null
            }
        case SET_CURRENT_ORDER_ERROR:
            return {
                ...state,
                pending: false,
                error: { type: action.type, message: action.message }
            }
        case CLEAR_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: {}
            }

        case SET_ORDERS_PENDING:

            return {
                ...state,
                pending: true
            }

        case SET_ORDERS_SUCCESS:

            return {
                ...state,
                allOrders: [...action.orders],
                pending: false,
                error: null
            }

        case SET_ORDERS_ERROR:

            return {
                ...state,
                pending: false,
                error: { type: action.type, message: action.message }
            }

        case ADD_ORDER:
            orders.splice(orders.length, 1, action.order)
            return {
                ...state,
                allOrders: orders
            }

        case UPDATE_ORDER:
            const index = orders.findIndex(order => order.id === action.order.id)
            orders.splice(index, 1, action.order)
            let current = { ...state.currentOrder }

            if (action.order.id === state.currentOrder.id) {
                current = { ...action.order }
            }

            return {
                ...state,
                allOrders: [...orders],
                currentOrder: current
            }

        case REMOVE_ORDER:

            return {
                ...state,
                allOrders: [...state.allOrders.filter(order => order.id !== action.order.id)]
            }

        case CLEAR_ORDER_STATE:

            return {
                ...initialState
            }
        default:
            return state
    }
}
export default orderReducer