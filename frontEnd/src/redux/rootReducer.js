import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import cartReducer from './cart'
import totalReducer from './totalReducer'

const rootReducer = combineReducers({
    user: userReducer,
    cartList: cartReducer,
    total: totalReducer
})

export default rootReducer