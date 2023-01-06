import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/auth'
import messageReducer from './slices/message'

const reducer = {
    authReducer,
    messageReducer
}

export const store = configureStore({
    reducer: reducer,
    devTools: true
})