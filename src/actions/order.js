import firebase from '../database/firebase.js'
import { ADD_ORDER, SET_ORDERS_SUCCESS, SET_ORDERS_ERROR, SET_CURRENT_ORDER_SUCCESS, SET_CURRENT_ORDER_ERROR, CLEAR_CURRENT_ORDER, UPDATE_ORDER, REMOVE_ORDER } from '../constants/index.js'
import { addOrderToUser } from './user.js'
const db = firebase.database()

export const addOrder = (order, user) => {
    let newOrder = { ...order, id: '', status: 'pending' }

    return dispatch => {
        db.ref('/Orders/').push({
            ...newOrder
        }).then(data => {
            newOrder.id = data.key

            dispatch(updateOrder(newOrder))

            dispatch({
                type: ADD_ORDER,
                order: { ...newOrder }
            })

            addOrderToUser(user.id, newOrder.id)
        })


    }
}


export const getAllOrders = () => {
    return dispatch => {
        const orders = []

        db.ref('/Orders/').once('value', orderSnapshot => {
            orderSnapshot.forEach(order => {
                orders.push({ ...order.val() })
            })

            if (orders.length == 0) {
                dispatch(setOrdersError())
            } else {
                dispatch(setOrdersSuccess(orders))
            }
        })
    }
}

export const setOrdersSuccess = orders => {

    return {
        type: SET_ORDERS_SUCCESS,
        orders
    }
}

export const setOrdersError = () => {

    return {
        type: SET_ORDERS_ERROR,
        message: "no orders"
    }
}

export const setCurrentOrderSuccess = order => {
    return {
        type: SET_CURRENT_ORDER_SUCCESS,
        order
    }
}

export const setCurrentOrderError = message => {
    return {
        type: SET_CURRENT_ORDER_ERROR,
        message
    }
}

export const clearCurrentOrder = () => {
    return {
        type: CLEAR_CURRENT_ORDER
    }
}

export const updateOrder = order => {
    return dispatch => {
        db.ref(`/Orders/${order.id}`).update({
            ...order
        })

        dispatch({
            type: UPDATE_ORDER,
            order
        })
    }
}

export const removeOrder = (order, userID) => {
    return dispatch => {
        db.ref(`/Orders/`).child(order.id).remove()
        db.ref(`/Uers/${userID}/orders/`)

        dispatch({
            type: REMOVE_ORDER,
            order
        })

    }
}
