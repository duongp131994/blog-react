import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import AuthService from "../services/auth.service";
import {setMessage} from "./message";

const user = JSON.parse(localStorage.getItem("D_user"));
const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export const register = createAsyncThunk(
    "auth/register",
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await AuthService.signup({username, email, password});

            if (response)
                if (typeof response.message !== 'undefined')
                    thunkAPI.dispatch(setMessage(response.data.message));
                return response.data;

            return thunkAPI.rejectWithValue();
        } catch (error) {
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
export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async ({email, password }, thunkAPI) => {
        try {
            const response = await AuthService.login({email, password});

            if (response)
                if (typeof response.message !== 'undefined')
                    thunkAPI.dispatch(setMessage(response.data.message));

                thunkAPI.dispatch(setMessage(response.data.msg));
                return response.data;

            return thunkAPI.rejectWithValue();
        } catch (error) {
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

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // updateUsername: () => {}
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            localStorage.setItem("D_user", JSON.stringify({
                'accessToken': action.payload?.accessToken,
                'refreshToken': action.payload?.refreshToken,
                'userData': action.payload?.userData,
            }))
            state.user = action.payload?.userData;
        },
        [userLogin.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
})

const { reducer } = userSlice;
export default reducer;
