import {createSlice} from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'todos',
    initialState: {//first state
        allTodos: [
            {
                id: 1,
                title: 'viec 1',
                completed: false
            },
            {
                id: 2,
                title: 'viec 2',
                completed: false
            },
            {
                id: 3,
                title: 'viec 3',
                completed: true
            },
            {
                id: 4,
                title: 'viec 4',
                completed: true
            },
        ]
    }
})

//reducer
const todosReducer1 = todosSlice.reducer

//selector
const todosSelector = state => state.todosReducer2.allTodos

export {todosSelector, todosReducer1}