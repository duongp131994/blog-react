import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {addTodo} from "../../../test-redux-toolkit/src/store/reducers/todosSlice";

const initialState = {
    userName: '',
    email: '',
    role: '',
    accessToken: '',
    waiting: false
}

const userLogin = createAsyncThunk('user/login', async ({title, id}) => {
    const newTodo = {
        id: id,
        title,
        completed: false
    }

    await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)

    return newTodo
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUsername: () => {}
    },
    extraReducers: {
        [userLogin.pending]: (state, action) => {
            // action.meta.arg.title = 'test'
            action.meta.arg.id = state.maxTodo + 1
        },
        [userLogin.fulfilled]: (state, action) => {
            state.allTodos.unshift(action.payload)
            state.maxTodo++
        },
        [userLogin.rejected]: (state, action) => {
            console.log(state, action)
            console.log('Failed to get todos!!!')
        },
    }
})

