import {configureStore} from '@reduxjs/toolkit'
import {todosReducer1} from './reducers/todosSlice'

//store
const store1 = configureStore({
     reducer: {//changing state and get state
         todosReducer2: todosReducer1
     }
})

//export
export {store1}