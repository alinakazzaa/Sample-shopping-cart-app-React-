import firebase from '../database/firebase.js'
import { SET_ITEMS_SUCCESS, SET_ITEMS_ERROR, SET_CURRENT_ITEM_SUCCESS, SET_CURRENT_ITEM_ERROR, CLEAR_CURRENT_ITEM, ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM } from '../constants/index.js'
const db = firebase.database()

export const addItem = value => {
    return dispatch => {
        db.ref('/Items').push({
            ...value
        }).then(data => {

            db.ref(`/Items/${data.key}`).update({
                id: data.key
            })
        })

        dispatch({
            type: ADD_ITEM
        })
    }
}


export const getAllItems = () => {
    return dispatch => {
        const items = []

        db.ref('/Items/').once('value', itemSnapshot => {
            itemSnapshot.forEach(item => {
                items.push({ ...item.val() })
            })

            if (items.length == 0) {
                dispatch(setItemsError())
            } else {
                dispatch(setItemsSuccess(items))
            }
        })
    }
}

export const setItemsSuccess = items => {

    return {
        type: SET_ITEMS_SUCCESS,
        items
    }
}

export const setItemsError = () => {

    return {
        type: SET_ITEMS_ERROR,
        message: "no items"
    }
}

export const setCurrentItemSuccess = item => {
    return {
        type: SET_CURRENT_ITEM_SUCCESS,
        item
    }
}

export const setCurrentItemError = message => {
    return {
        type: SET_CURRENT_ITEM_ERROR,
        message
    }
}

export const clearCurrentItem = () => {
    return {
        type: CLEAR_CURRENT_ITEM
    }
}

export const updateItem = item => {
    return dispatch => {
        db.ref(`/Items/${item.id}`).update({
            ...item
        })

        dispatch({
            type: UPDATE_ITEM,
            item
        })
    }
}

export const removeItem = item => {
    return dispatch => {
        db.ref(`/Items/`).child(item.id).remove()

        dispatch({
            type: REMOVE_ITEM,
            item
        })

    }
}
