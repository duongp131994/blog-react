import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const todosSlice = createSlice({
    name: 'todos',
    initialState: {//first state
        allTodos: [

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
        },
        addAllTodos(state, action) {
            state.allTodos = action.payload
            state.maxTodo = state.allTodos.length
        }
    }
})

//fetch data
const getTodos = () =>  async dispatch => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        dispatch(addAllTodos(response.data))
    } catch (e) {
        console.warn(e)
    }
}
//reducer
const todosReducer1 = todosSlice.reducer

//selector
const todosSelector = state => state.todosReducer2.allTodos
//action
const  {addTodo, markComplete, deleteTodo, addAllTodos} = todosSlice.actions

export {todosSelector, todosReducer1, addTodo, markComplete, deleteTodo, getTodos}