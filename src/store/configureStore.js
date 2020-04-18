import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import itemReducer from '../reducers/itemReducer'
import basketReducer from '../reducers/basketReducer'
import orderReducer from '../reducers/orderReducer'
import { loadState, saveState } from './localStorage'

const persistedState = loadState()

const rootReducer = combineReducers(
    {
        user: userReducer,
        item: itemReducer,
        basket: basketReducer,
        order: orderReducer
    }
)

const configureStore = () => {
    const store = createStore(rootReducer, persistedState, applyMiddleware(thunk))

    store.subscribe(() => {
        saveState({
            user: store.getState().user,
            item: store.getState().item,
            basket: store.getState().basket,
            order: store.getState().order

        })
    })

    return store
}

export default configureStore