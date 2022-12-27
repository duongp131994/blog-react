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
        ],
        maxTodo: 4
    },
    reducers: {
        addTodo: {
            reducer(state, action) {
                action.payload.id = state.maxTodo + 1
                state.allTodos.unshift(action.payload)//payload la bat buoc
                state.maxTodo++
            },
            prepare({title, completed}) {
                return {
                    payload: {
                        title,
                        completed
                    }
                }
            }
        },
        markComplete(state, action) {
            state.allTodos = state.allTodos.map(todo => {
                if (action.payload > 0 && todo.id === action.payload) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        },
        deleteTodo(state, action) {
            let todoId = action.payload
            state.allTodos = state.allTodos.filter(todo => todo.id !== todoId)
        }
    }
})

//reducer
const todosReducer1 = todosSlice.reducer

//selector
const todosSelector = state => state.todosReducer2.allTodos
//action
const  {addTodo, markComplete, deleteTodo} = todosSlice.actions

export {todosSelector, todosReducer1, addTodo, markComplete, deleteTodo}