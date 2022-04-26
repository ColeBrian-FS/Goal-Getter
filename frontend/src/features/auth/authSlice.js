import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService"
// Get user from local storage 
const user = JSON.parse(localStorage.getItem("goal-getter-user"))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    message: ''
}

// Register user 
export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
    try {
        // returns user data from server
        return await authService.register(user)

    } catch (error) {
        // checks all possible errors returns specific message object
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

// Login user 
export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
    try {
        // returns user data from server
        return await authService.login(user)

    } catch (error) {
        if (error.response.status) {
            localStorage.removeItem('goal-getter-user')
        }
        // checks all possible errors returns specific message object
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

// 
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})


// Setting Global State

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // reset the intital state
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''

        }
    },
    // actions of what the authorization can do 

    extraReducers: (builder) => {
        builder
            // fetchng the data - When register action is pending

            // updates the global state true 
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            // when data hase been received 
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            // Login Case
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            // when data hase been received 
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })


            // Logout the user and reset the state
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})
// sets reset set back initial state
export const { reset } = authSlice.actions
export default authSlice.reducer