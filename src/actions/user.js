import firebase from '../database/firebase.js'
import { SET_USERS_SUCCESS, SET_USERS_ERROR, SET_CURRENT_USER_SUCCESS, SET_CURRENT_USER_ERROR, CLEAR_CURRENT_USER, ADD_USER, UPDATE_USER, CLEAR_USER_STATE, CLEAR_ITEM_STATE, CLEAR_BASKET_STATE } from '../constants/index.js'
const db = firebase.database()

export const addUser = user => {
    return dispatch => {
        db.ref('/Users').push({
            ...user,
            confirmPassword: null
        }).then(data => {

            db.ref(`/Users/${data.key}`).update({
                id: data.key
            })

            dispatch(setCurrentUserSuccess({ ...user, id: data.key }))

            dispatch({
                type: ADD_USER,
                user: { ...user, id: data.key }
            })
        })
    }
}


export const getAllUsers = () => {
    return dispatch => {
        const users = []

        db.ref('/Users/').once('value', userSnapshot => {
            userSnapshot.forEach(user => {
                users.push({ ...user.val() })
            })

            if (users.length == 0) {
                dispatch(setUsersError())
            } else {
                dispatch(setUsersSuccess(users))
            }
        })
    }
}

export const setUsersSuccess = users => {

    return {
        type: SET_USERS_SUCCESS,
        users
    }
}

export const setUsersError = () => {

    return {
        type: SET_USERS_ERROR
    }
}

export const setCurrentUserSuccess = user => {
    return {
        type: SET_CURRENT_USER_SUCCESS,
        user
    }
}

export const setCurrentUserError = message => {
    return {
        type: SET_CURRENT_USER_ERROR,
        message
    }
}

export const logOutUser = () => {
    return dispatch => {

        dispatch({ type: CLEAR_BASKET_STATE })
        dispatch({ type: CLEAR_ITEM_STATE })
        dispatch({ type: CLEAR_USER_STATE })
    }

}

export const updateUser = user => {
    db.ref(`/Users/${user.id}`).update({
        ...user
    })

    return {
        type: UPDATE_USER,
        user
    }
}

export const addOrderToUser = (userID, orderID) => {
    db.ref(`/Users/${userID}/orders/${orderID}`).set({ id: orderID })
}

export const removeUser = user => {
    db.ref(`/Users`).child(user.id).remove()
}
