import firebase from '../database/firebase.js'
import { SET_USERS_SUCCESS, SET_USERS_ERROR, SET_CURRENT_USER_SUCCESS, SET_CURRENT_USER_ERROR, CLEAR_CURRENT_USER, ADD_USER } from '../constants/index.js'
const db = firebase.database()

export const addUser = value => {
    db.ref('/Users').push({
        ...value
    })

    return {
        type: ADD_USER
    }
}

export const getAllUsers = () => {
    return dispatch => {
        const users = []

        db.ref('/Users/').once('value', userSnapshot => {
            userSnapshot.forEach(user => {
                users.push({ ...user.val().details })
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
        users: users
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
        message: message
    }
}

export const logOutUser = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}

export const updateUser = (user, user_id) => {
    db.ref(`/Users/${user_id}`).update({
        details: {
            ...user
        }
    })
}

export const removeUser = user => {
    db.ref(`/Users`).child(user.id).remove()
}
