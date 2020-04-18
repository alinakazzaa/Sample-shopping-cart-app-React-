import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import itemReducer from '../reducers/itemReducer'
import basketReducer from '../reducers/basketReducer'
import { loadState, saveState } from './localStorage'

const persistedState = loadState()

const rootReducer = combineReducers(
    {
        user: userReducer,
        item: itemReducer,
        basket: basketReducer
    }
)

const configureStore = () => {
    const store = createStore(rootReducer, persistedState, applyMiddleware(thunk))

    store.subscribe(() => {
        saveState({
            user: store.getState().user,
            item: store.getState().item,
            basket: store.getState().basket

        })
    })

    return store
}

export default configureStore