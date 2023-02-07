import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import AuthService from "../services/auth.service";
import {setMessage} from "./message";

const D_user = JSON.parse(localStorage.getItem("D_user"))
const initialState = D_user
    ? { isLoggedIn: true, user: D_user }
    : { isLoggedIn: false, user: null };

export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async ({email, password }, thunkAPI) => {
        try {
            const response = await AuthService.login({email, password});

            console.log(response)
            if (response[0]) {
                return response[1];
            }
            // thunkAPI.dispatch(setMessage(response[1]));
            return thunkAPI.rejectWithValue();
        } catch (error) {
            console.log(error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue();
        }
    }
);

export const userLogout = createAsyncThunk("auth/userLogout", async () => {
    console.log(localStorage.getItem("D_user"))
    await AuthService.logout();
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: {
        [userLogin.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            console.log(action)
            localStorage.setItem("D_user", JSON.stringify({
                'accessToken': action.payload?.accessToken,
                'refreshToken': action.payload?.refreshToken,
                'userData': action.payload?.userData,
            }))
            state.user = {
                'accessToken': action.payload?.accessToken,
                'refreshToken': action.payload?.refreshToken,
                'userData': action.payload?.userData,
            };
        },
        [userLogin.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [userLogout.fulfilled]: (state, action) => {
            console.log(state, action)
            state.isLoggedIn = false;
            state.user = null;
        },
    }
})

const { reducer, actions } = userSlice;
// export const { userLogout } = actions
export default reducer;
